import { Injectable } from '@angular/core';

@Injectable()
export class MessageHandlerService {
  messages: string[] = [] as any;

  add(message: string) {
    this.messages.push(message);
  }

  get() {
    console.log(this.messages);
    return this.messages;
  }

  clear() {
    this.messages = [];
  }
}
