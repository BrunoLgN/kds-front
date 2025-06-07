import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { RxStompService } from '@stomp/ng2-stompjs';


import { MatSnackBar } from '@angular/material/snack-bar';

import { RxStompState } from '@stomp/rx-stomp';
import { UsuarioService } from '../../../services/usuario.service';
import { MessageService } from '../../../services/message.service';
import { Usuario } from '../../../models/usuario';
import { ChannelService } from '../../../services/channel.service';
import { Message } from '../../../shared/model/message';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/module/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'wt-userlist',
    standalone: true,
    templateUrl: './users-list.component.html',
    imports: [SharedModule, FormsModule, CommonModule],
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

    NEW_USER_LIFETIME: number = 1000 * 5;

    @Input()
    username!: string;

    @Output()
    receiverUpdated = new EventEmitter<string>();

    usuarios: Array<Usuario> = [];
    highlightedUsers: Array<string> = [];
    newConnectedUsers: Array<string> = [];
    channel!: string;
    receiver!: string;
    topicSubscription: any;

    constructor(private userService: UsuarioService, private stompService: RxStompService,
        private channelService: ChannelService, private snackBar: MatSnackBar,
        private messageService: MessageService) { }

    ngOnInit() {
        this.userService.findUsers().subscribe(
            (res: Usuario[]) => {
                this.usuarios = res;
                this.initUserEvents();
            }
        );

        this.channelService.getChannel().subscribe(channel => this.channel = channel);
    }

    @HostListener('window:focus', [])
    sendReadReceipt() {
        if (this.channel != null && this.receiver != null) {
            this.messageService.sendReadReceipt(this.channel, this.receiver);
        }
    }

    startChatWithUser(usuario: Usuario) {
        const channelId = ChannelService.createChannel(this.username, usuario.username);
        this.channelService.refreshChannel(channelId);
        this.receiver = usuario.username;
        this.highlightedUsers = this.highlightedUsers.filter(u => u !== usuario.username);
        this.receiverUpdated.emit(usuario.username);
        this.messageService.sendReadReceipt(channelId, usuario.username);
    }

    getOtherUsers(): Array<Usuario> {
  console.log('usuarios:', this.usuarios);
  console.log('username:', this.username);
  return this.usuarios ? this.usuarios.filter(usuario => usuario.username !== this.username) : [];
}


    getUserItemClass(usuario: Usuario): string {
        let classes: string = 'user-item';
        if (usuario.username === this.receiver) {
            classes += ' current-chat-user ';
        }

        if (this.highlightedUsers.indexOf(usuario.username) >= 0) {
            classes += ' new-message';
        }

        if (this.newConnectedUsers.indexOf(usuario.username) >= 0) {
            classes += ' new-user';
        }

        if (!usuario.connected) {
            classes += ' disconnected-user';
        }

        return classes;
    }

    initUserEvents() {
        this.stompService.watch('/channel/login').subscribe(res => {
            const data: Usuario = JSON.parse(res.body);
            if (data.username !== this.username) {
                this.newConnectedUsers.push(data.username);
                setTimeout((
                     () => {
                        this.removeNewUserBackground(data.username);
                    }
                ).bind(this), this.NEW_USER_LIFETIME);
                this.usuarios = this.usuarios.filter(item => item.username !== data.username);
                this.usuarios.push(data);
                this.subscribeToOtherUser(data);
            }
        });

        this.stompService.watch('/channel/logout').subscribe(res => {
            const data: Usuario = JSON.parse(res.body);
            this.usuarios = this.usuarios.filter(item => item.username !== data.username);
            this.usuarios.push(data);
            const channelId = ChannelService.createChannel(this.username, data.username);
            if (this.channel === channelId) {
                this.receiverUpdated.emit('');
                this.channelService.removeChannel();
            }
        });

        this.subscribeToOtherUsers(this.usuarios, this.username);
    }

    removeNewUserBackground(username: string) {
        this.newConnectedUsers = this.newConnectedUsers.filter(u => u !== username);
    }

    subscribeToOtherUsers(usuarios: any[], username: string) {
        const filteredUsers: Array<any> = usuarios.filter(usuario => username !== usuario.username);
        filteredUsers.forEach(user => this.subscribeToOtherUser(user));
    }

    subscribeToOtherUser(otherUser: Usuario): string {
        const channelId = ChannelService.createChannel(this.username, otherUser.username);
        this.stompService.watch(`/channel/chat/${channelId}`).subscribe(res => {
            const data: Message = JSON.parse(res.body);
            this.messageService.pushMessage(data);

            if (data.channel !== this.channel) {
                this.showNotification(data);
            } else {
                // send read receipt for the channel
                this.messageService.sendReadReceipt(this.channel, otherUser.username);
            }
        });

        return channelId;
    }

    showNotification(message: Message) {
        const snackBarRef = this.snackBar.open('New message from ' + message.sender, 'Show', { duration: 3000 });
        this.highlightedUsers.push(message.sender);
        snackBarRef.onAction().subscribe(() => {
            this.receiver = message.sender;
            this.receiverUpdated.emit(message.sender);
            this.channel = ChannelService.createChannel(this.username, message.sender);
            this.channelService.refreshChannel(this.channel);
        });
    }
}