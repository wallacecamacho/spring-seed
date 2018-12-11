import { Component, Inject } from '@angular/core';
import { MessageHandlerService } from './message-handler.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-messages',
  template: `<div mat-dialog-title>
  <div style="height: 40px; display: flex;">
    <div >
      <i class="material-icons" style="font-size: 38px;">error_outline</i>
    </div>
    <div style="align-self: center">
      {{data.errorMessage}} - {{data.errorCode}}
    </div>
  </div>
  <mat-divider></mat-divider>
</div>
<div mat-dialog-content>
  <ul *ngIf="data.message.messages.length">
    <li *ngFor='let message of data.message.messages'> {{message}}
    </li>
  </ul>
</div>
<mat-divider></mat-divider>
<mat-dialog-actions style="align-content: stretch; flex-direction: row-reverse;">

  <button mat-button [mat-dialog-close]="true">Fechar</button>
</mat-dialog-actions>`
})
export class MessagesHandlerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
