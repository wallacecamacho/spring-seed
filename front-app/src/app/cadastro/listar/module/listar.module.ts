import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxMaskModule} from 'ngx-mask';
import { MaterialModule } from 'src/core/config/public_api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListarComponent } from '../component/listar.component';

@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule.withConfig({useColumnBasisZero: false}),

  ],
  exports: [
    ListarComponent
]
})
export class ListarModule { }
