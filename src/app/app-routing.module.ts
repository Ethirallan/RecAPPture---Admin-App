import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

/**
 * nova, zavrnjena, cakajoca and koncana are using same component - grid system for displaying orders.
 * Each one has a static status value, which determines which order will be returned from the server.
 * All paths but prijava ~ login are protected with AuthGuard.
 */

const routes: Routes = [
  {path: 'nova', component: OrdersComponent, canActivate: [AuthGuard], data : { status : 'new' }},
  {path: 'zavrnjena', component: OrdersComponent, canActivate: [AuthGuard], data : { status : 'rejected' }},
  {path: 'cakajoca', component: OrdersComponent, canActivate: [AuthGuard], data : { status : 'waiting' }},
  {path: 'koncana', component: OrdersComponent, canActivate: [AuthGuard], data : { status : 'done' }},
  {path: 'narocilo/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  {path: 'prijava', component: LoginComponent},
  {path: '', redirectTo: 'nova', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
