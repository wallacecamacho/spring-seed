import { Component } from '@angular/core';
import { MessageLoggerService } from './message-logger.service';

@Component({
  selector: 'app-messages-logger',
  template: `<div *ngIf="messageLoggerService.messages.length">
  <h3>Messages</h3>
  <button class="clear" (click)="messageLoggerService.clear()">clear</button>
  <br>
  <ol>
    <li *ngFor='let message of messageLoggerService.messages'> {{message}} </li>
  </ol>
</div>`
})
export class MessagesLoggerComponent {
  constructor(public messageLoggerService: MessageLoggerService) {}
}
