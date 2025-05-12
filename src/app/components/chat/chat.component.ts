import { Component, OnInit } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { User } from 'stream-chat';
import { ChannelService, ChatClientService, StreamAutocompleteTextareaModule, StreamChatModule, StreamI18nService } from 'stream-chat-angular';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [TranslateModule, StreamAutocompleteTextareaModule, StreamChatModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
 

}
