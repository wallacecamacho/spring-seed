
/**
 * Entry point for all public APIs of the package.
 */

// This file only reexports content of the `src` folder. Keep it that way.
export { ConfigModule } from '../config/config.module';
export { PageNotFoundComponent } from '../config/pages/not-found.component';
export { SelectivePreloadingStrategyService } from '../config/pre-load/selective-preloading-strategy.service';

/**
 * app
 */
export { AppConfig } from '../config/app/app-config';
export { configAppProviders } from '../config/app';
export { APP_CONFIG, HERO_DI_CONFIG } from '../config/app/app.config';

/**
 * logger
 */
export { MessageLoggerModule } from '../config/logger/message-logger.module';
export { MessageLoggerService } from '../config/logger/message-logger.service';
export { MessagesLoggerComponent } from '../config/logger/messages-logger.component';

/**
 * error
 */
export { MessageHandlerModule } from '../config/exception/message-handler.module';
export { HttpErrorHandler, HandleError } from '../config/exception/http-error-handler.service';

/**
 * material
 */
export { MaterialModule } from '../config/material/app.material.module';
export { ErrorStateMatcherSubmit } from '../config/material/errorStateMatcher-submit';
/**
 * interceptor
 */
export  { httpInterceptorAppProviders } from '../config/interceptors/index';

/**
 * MessagesHandlerComponent
 */
export { MessagesHandlerComponent } from '../config/exception/messages-handler.component';
export { MessageHandlerService } from '../config/exception/message-handler.service';
