import { Injectable } from '@angular/core';
import {
  HttpRequest,
} from '@angular/common/http';
import { Observable, of, Observer, ReplaySubject, Subject, timer, throwError } from 'rxjs';
import { delay, catchError, debounce, materialize, dematerialize } from 'rxjs/internal/operators';


import { HttpClient } from '@angular/common/http';
import { ENDPOINT_API } from 'src/core/api.config';
import { HandleError, HttpErrorHandler } from 'src/core/config/public_api';
import { INotification } from 'src/core/config/notifications/notification';
import { IRegister } from '../model/register';
import { CONSTANTES } from 'src/core/config/constantes';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  redirectUrl: string;
  cachedRequests: Array<HttpRequest<any>> = [];

  private constantes = CONSTANTES;

  private registerUrnEndpoint = `${ENDPOINT_API}/contas`;
  private handleError: HandleError;
  public notification$: Observable<INotification>;

  public subjectSuccess = new Subject<INotification>();
  public subjectError = new Subject<INotification>();

  public subjectList = new Subject<IRegister[]>();

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('RegisterService');
  }

  public register(register: IRegister): void {
    try {
      this.registerService(register)
        .pipe(
          catchError(err => {
            return throwError(err);
          })
        )
        .subscribe(
          result => {
            this.subjectSuccess.next({ title: this.constantes.SUCCESS, message: 'Inserido com sucesso' });
          },
          err => {
            this.subjectError.next({ title: this.constantes.ERROR, message: 'Erro ao inserir' });
          },
          () => {
            console.log(`We're done here!`);
          }
        );

    } catch (error) {
      console.log(error);
    }
  }

  public listAll(): void {
    try {
      this.listService()
        .pipe(
          catchError(err => {
            return throwError(err);
          })
        ).subscribe(
          result => {
            console.log(result);
            this.subjectList.next(result);
          },
          err => {
            this.subjectError.next({ title: this.constantes.ERROR, message: 'Erro ao Recuperar List' });
          },
          () => {
            console.log(`We're done here!`);
          }
        );

    } catch (error) {
      console.log(error);
    }
  }

  private registerService(register: IRegister): Observable<any> {
    return this.http.post<IRegister>(this.registerUrnEndpoint, register)
      .pipe(
        catchError(err => {
          this.handleError('Cadastrar', register);
          return throwError(err);
        }
        )
      );
  }

  private listService(): Observable<any> {
    return this.http.get<IRegister>(this.registerUrnEndpoint)
      .pipe(
        catchError(err => {
          this.handleError('Listar');
          return throwError(err);
        }
        )
      );
  }


}
