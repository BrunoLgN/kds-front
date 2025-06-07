import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Message } from '../shared/model/message';
import { settings } from '../shared/util/settings';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class MessageService {

    private messages: Array<Message> = [];
    private msgs = new Subject<Array<Message>>();

    constructor(private http: HttpClient) { }

    pushMessage(message: Message) {
        this.messages.push(message);
        this.msgs.next(this.messages);
    }

    filterMessages(channel: string): Array<Message> {
    return this.messages
      .filter(message => channel === message.channel)
      .sort((m1, m2) => {
        // Proteção contra timestamp undefined
        const t1 = m1.timestamp ?? 0;
        const t2 = m2.timestamp ?? 0;
        return t1 > t2 ? 1 : -1;
      });
  }

    sendReadReceipt(channelId: string, username: string) {
        this.http.post(settings.baseUrl + '/messages/', {
            channel: channelId,
            username: username
        });
    }

    getMessages(): Observable<any> {
        return this.msgs.asObservable();
    }

}