import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxMaskModule} from 'ngx-mask';
import { MaterialModule } from 'src/core/config/public_api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastroComponent } from '../component/cadastro.component';

@NgModule({
  declarations: [CadastroComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule.withConfig({useColumnBasisZero: false}),

  ],
  exports: [
    CadastroComponent
]
})
export class CadastroModule { }
