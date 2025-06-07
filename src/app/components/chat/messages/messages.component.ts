import { Component, OnInit, Input, NgModule } from '@angular/core';

import { RxStompService } from '@stomp/ng2-stompjs';

import { Message } from '../../../shared/model/message';
import { MessageService } from '../../../services/message.service';
import { ChannelService } from '../../../services/channel.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/module/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxFloatUiModule } from 'ngx-float-ui';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [SharedModule, FormsModule, CommonModule,MatListModule,
  MatIconModule, NgxFloatUiModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {

  filteredMessages: Array<Message> = [];
  newMessage!: string;
   channel!: string;

  @Input()
  username!: string;

  constructor(private stompService: RxStompService,
    private messageService: MessageService,
    private channelService: ChannelService) { }

  ngOnInit() {
    this.channelService.getChannel().subscribe(channel => {
      this.channel = channel;
      this.filterMessages();
    });

    this.messageService.getMessages().subscribe(messages => {
      this.filterMessages();
    });
  }

  sendMessage() {
    if (this.newMessage) {
      this.stompService.publish({
        destination: '/app/messages', body:
          JSON.stringify({
            'channel': this.channel,
            'sender': this.username,
            'content': this.newMessage
          })
      });
      this.newMessage = '';
      this.scrollToBottom();
    }
  }

  filterMessages() {
    this.filteredMessages = this.messageService.filterMessages(this.channel);
    this.scrollToBottom();
  }

  scrollToBottom() {
  const msgContainer = document.getElementById('msg-container');
  if (msgContainer) {
    msgContainer.scrollTop = msgContainer.scrollHeight;
  } else {
    console.warn('Elemento #msg-container não encontrado!');
  }
}
  
}
