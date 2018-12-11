import { Injectable, Provider } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { MessageHandlerService } from '../exception/message-handler.service';
import { MessagesHandlerComponent } from '../exception/messages-handler.component';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(private messageService: MessageHandlerService, public dialog: MatDialog) { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>
    (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result)

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `O servidor retornou o codigo ${error.status} com o body "${error.statusText}"`;

      // TODO: better job of transforming error for user consumption
      this.messageService.add(`${serviceName}: ${operation} falhou: ${message}`);

      const diag = this.openDialog(error);

      diag.afterClosed().subscribe(resultMessage => {
        this.messageService.clear();
      });
      // Let the app keep running by returning a safe result.
      return of( result );
    };

  }

  openDialog(error: HttpErrorResponse) {
    const dialogRef =  this.dialog.open(MessagesHandlerComponent, {
    data: {message: this.messageService,
    errorCode: error.status,
    errorMessage: error.name
  }
   });

    return dialogRef;
  }

}

export const handlerProviderDialog: Provider[] = [
  { provide: MatDialogRef, useValue: {} }
];

