import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarComponent } from './cadastro/listar/component/listar.component';
import { CadastroComponent } from './cadastro/adicionar/component/cadastro.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'incluir',
    pathMatch: 'full'
  },
  {
    path: 'incluir',
    component: CadastroComponent,
   // loadChildren: './cadastro/adicionar/module/cadastro.module#CadastroModule',
  },
  {
    path: 'listar',
    component: ListarComponent,
    //loadChildren: './cadastro/listar/module/listar.module#ListarModule',
  }, {
   path: '**',
   redirectTo: '**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
