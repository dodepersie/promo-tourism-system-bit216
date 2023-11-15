import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login/login.component';
import { RegisterMerchantComponent } from './components/register-merchant/register-merchant.component';
import { DashboardUserIndexComponent } from './pages/dashboard-user-index/dashboard-user-index.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
 { path: '', component: HomeMainComponent, title: 'PromoTourism: Home' },
 { path: 'login', component: LoginPageComponent, title: 'PromoTourism: Login' },
 { path: 'register', component: RegisterCustomerComponent, title: 'PromoTourism: Register as Customer' },
 { path: 'register-merchant', component: RegisterMerchantComponent, title: 'PromoTourism: Register as Merchant' },
 { path: 'user/dashboard', component: DashboardUserIndexComponent, title: 'User Dashboard' },
 { path: '**', component: PageNotFoundComponent, title: '404 - Not Found' },
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
