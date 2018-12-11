import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule, httpInterceptorAppProviders, ConfigModule } from 'src/core/config/public_api';
import { HttpClientModule } from '@angular/common/http';
import { httpProviders } from 'src/core/providers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListarModule } from './cadastro/listar/module/listar.module';
import { CadastroModule } from './cadastro/adicionar/module/cadastro.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    ConfigModule,
    MaterialModule,
    FlexLayoutModule.withConfig({useColumnBasisZero: false}),

    CadastroModule,
    ListarModule
  ],
  providers: [
    httpInterceptorAppProviders,
    Title,
    httpProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
