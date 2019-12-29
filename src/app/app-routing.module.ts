import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/guards/auth.guard';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  // { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: '', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent}
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


