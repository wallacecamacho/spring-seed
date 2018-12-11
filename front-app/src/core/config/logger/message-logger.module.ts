import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Http, RequestOptions } from '@angular/http';
import { MessageLoggerService } from './message-logger.service';



@NgModule({
    imports: [
        CommonModule
    ],
    providers: [ MessageLoggerService ]
  })
export class MessageLoggerModule {}
