import { Component } from '@angular/core';
import { routerTransition } from 'src/core/config/animations/router.transition';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'front-app';

  navigation = [
    { link: 'listar', label: 'Listar' },
    { link: 'incluir', label: 'Incluir' }
  ];

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
  ) {
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

}
