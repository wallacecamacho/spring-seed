import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { INotification } from 'src/core/config/notifications/notification';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IRegister } from 'src/shared/model/register';
import { RegisterService } from 'src/shared/service/register.service';
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit, OnDestroy {

  notificationSuccess$: Subject<IRegister[]>;
  notificationError$: Subject<INotification>;

  listElements: IRegister[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['nome', 'limite', 'risco', 'taxa'];
  dataSource = [];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(
    private _titleService: Title,
    private _route: ActivatedRoute,
    private _router: Router,
    private _registerService: RegisterService,
  ) {


    this.notificationSuccess$ = this._registerService.subjectList;
    this.notificationError$ = this._registerService.subjectError;

    this.notificationSuccess$.subscribe(
      data => {
        console.log(data);
        this.dataSource = data;
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.length;

      });

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }


  ngOnInit() {
    this._registerService.listAll();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
