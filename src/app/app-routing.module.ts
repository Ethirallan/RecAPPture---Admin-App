import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: 'nova', component: OrdersComponent, canActivate: [AuthGuard], data : { status : 'new' }},
  {path: 'zavrnjena', component: OrdersComponent, canActivate: [AuthGuard], data : { status : 'rejected' }},
  {path: 'cakajoca', component: OrdersComponent, canActivate: [AuthGuard], data : { status : 'waiting' }},
  {path: 'koncana', component: OrdersComponent, canActivate: [AuthGuard], data : { status : 'done' }},
  {path: 'narocilo/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  {path: 'prijava', component: LoginComponent},
  {path: '', redirectTo: 'prijava', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
