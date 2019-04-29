import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { AcceptedComponent } from './components/accepted/accepted.component';
import { RejectedComponent } from './components/rejected/rejected.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'accepted', component: AcceptedComponent, canActivate: [AuthGuard]},
  {path: 'rejected', component: RejectedComponent, canActivate: [AuthGuard]},
  {path: 'order/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'orders', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
