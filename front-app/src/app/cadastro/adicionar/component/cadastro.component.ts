import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { routerTransition } from 'src/core/config/animations/router.transition';
import { takeUntil } from 'rxjs/operators';
import { INotification } from 'src/core/config/notifications/notification';
import { IRegister } from 'src/shared/model/register';
import { RegisterService } from 'src/shared/service/register.service';
import { ErrorStateMatcherSubmit } from 'src/core/config/public_api';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [routerTransition]
})
export class CadastroComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  registerFormErrors: any;

  notificationSuccess$: Subject<INotification>;
  notificationError$: Subject<INotification>;

  iRegister: IRegister = {} as any;

  matcher = new ErrorStateMatcherSubmit();

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(
    private _titleService: Title,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _registerService: RegisterService,
    private _snackBar: MatSnackBar,
  ) {


    this.notificationSuccess$ = this._registerService.subjectSuccess;
    this.notificationError$ = this._registerService.subjectError;


    // Set the defaults
    this.registerFormErrors = {
      nome: {},
      limite: {},
      risco: {}
    };

    this.notificationSuccess$.subscribe(
      data => {
        this._snackBarMessage(data.title, data.message);
        this.registerForm = this._formBuilder.group({
          nome: ['', [Validators.required]],
          limite: ['', [Validators.required, Validators.maxLength(11)]],
          risco: ['', [Validators.required]],
        });
      }
    );
    this.notificationError$.subscribe(
      data => {
        this._snackBar.open( 'Erro', data.message, {
          duration: 2000,
        });
      }
    );

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  /**
   * On init
   */
  ngOnInit(): void {

    this.registerForm = this._formBuilder.group({
      nome: ['', [Validators.required]],
      limite: ['', [Validators.required, Validators.maxLength(11)]],
      risco: ['', [Validators.required]],
    });


    this.registerForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onRegisterFormValuesChanged();
      });

  }

      /**
     * On destroy
     */
    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();

//      this.notificationSuccess$.complete();
 //     this.notificationError$.complete();
  }

  /**
   * On form values changed
   */
  onRegisterFormValuesChanged(): void {
    for (const field in this.registerFormErrors) {
      if (!this.registerFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.registerFormErrors[field] = {};

      // Get the control
      const control = this.registerForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.registerFormErrors[field] = control.errors;
      }
    }
  }

  private _snackBarMessage(title: string, message: string) {
    this._snackBar.open(title, message, {
      duration: 2000,
    });
  }

  public submit() {
    if (this.registerForm.valid) {
      this.formToRegisterInterface();
      this._register();
    }
  }

  private _register() {
    this._registerService.register(this.iRegister);
  }

  private formToRegisterInterface(): void {
    this.iRegister.nome = this.registerForm.value.nome;
    this.iRegister.limite = this.registerForm.value.limite;
    this.iRegister.risco = this.registerForm.value.risco;

    if (this.registerForm.value.risco === 'A') {
      this.iRegister.taxa = 0.0;
    } else if (this.registerForm.value.risco === 'B') {
      this.iRegister.taxa = 10;
    } else if (this.registerForm.value.risco === 'C') {
      this.iRegister.taxa = 20;
    }

  }


}
