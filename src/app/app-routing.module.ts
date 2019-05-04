import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { RejectedComponent } from './components/rejected/rejected.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WaitingComponent } from './components/waiting/waiting.component';
import { DoneComponent } from './components/done/done.component';

const routes: Routes = [
  {path: 'nova', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'zavrnjena', component: RejectedComponent, canActivate: [AuthGuard]},
  {path: 'cakajoca', component: WaitingComponent, canActivate: [AuthGuard]},
  {path: 'koncana', component: DoneComponent, canActivate: [AuthGuard]},
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
