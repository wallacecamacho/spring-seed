import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageHandlerService } from './message-handler.service';
import { HttpErrorHandler, handlerProviderDialog } from './http-error-handler.service';
import { MessagesHandlerComponent } from './messages-handler.component';



@NgModule({
    imports: [
        CommonModule
    ],
  //  declarations: [
  //      MessagesHandlerComponent
  //  ],
 //   entryComponents: [
 //       MessagesHandlerComponent
//    ],
    providers: [
        MessageHandlerService,
        HttpErrorHandler,
        handlerProviderDialog
     ]
  })
export class MessageHandlerModule {}
