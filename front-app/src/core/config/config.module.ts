import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { httpInterceptorAppProviders } from './interceptors/index';
import { HttpErrorHandler } from './exception/http-error-handler.service';
import { MessageLoggerService } from './logger/message-logger.service';
import { MessageHandlerService } from './exception/message-handler.service';
import { configAppProviders } from './app/index';

import { MessagesHandlerComponent } from './exception/messages-handler.component';
import { MessageLoggerModule } from './logger/message-logger.module';
import { PageNotFoundComponent } from './pages/not-found.component';
import { MessagesLoggerComponent } from './logger/messages-logger.component';
import { MaterialModule } from './material/app.material.module';
import { MessageHandlerModule } from './exception/message-handler.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MessageLoggerModule,
  ],
  exports: [
    MaterialModule,
    MessageLoggerModule  ],
  declarations: [
    PageNotFoundComponent,
    MessagesLoggerComponent,
    MessagesHandlerComponent,
  ],
  entryComponents: [
    MessagesHandlerComponent,
  ],
  providers: [
    configAppProviders,
    MessageLoggerService,
    httpInterceptorAppProviders,
    MessageHandlerService,
    HttpErrorHandler
  ]
})
export class ConfigModule { }
