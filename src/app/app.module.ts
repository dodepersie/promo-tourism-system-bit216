import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './components/login/login.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardUserIndexComponent } from './pages/dashboard/user-dashboard/dashboard-user-index.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { RegisterCustomerFormComponent } from './components/register-customer-form/register-customer-form.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterMerchantComponent } from './components/register-merchant/register-merchant.component';
import { RegisterMerchantFormComponent } from './components/register-merchant-form/register-merchant-form.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { RegisterMerchantStepperComponent } from './components/register-merchant-stepper/register-merchant-stepper.component';
import { RegisterMerchantFormTwoComponent } from './components/register-merchant-form-two/register-merchant-form-two.component';
import { HomeProductsComponent } from './components/home-products/home-products.component';
import { DashboardAccountManagementComponent } from './pages/dashboard/account-management/dashboard-account-management.component';
import { MerchantDetailComponent } from './pages/dashboard/account-management/merchant-detail/merchant-detail.component';
import { ProductManagementComponent } from './pages/dashboard/product-management/product-management.component';
import { ChangeMerchantPasswordComponent } from './pages/dashboard/change-merchant-password/change-merchant-password.component';
import { CreateNewProductComponent } from './pages/dashboard/product-management/create-new-product/create-new-product.component';
import { EditProductComponent } from './pages/dashboard/product-management/edit-product/edit-product.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutProductComponent } from './pages/checkout-product/checkout-product.component';
import { ReviewTourismProductComponent } from './pages/review-tourism-product/review-tourism-product.component';
import { ReviewPagesComponent } from './pages/review-tourism-product/review-pages/review-pages.component';
import { ViewAnalyticsReportComponent } from './pages/view-analytics-report/view-analytics-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginPageComponent,
    JumbotronComponent,
    WhyUsComponent,
    FooterComponent,
    DashboardUserIndexComponent,
    HomeMainComponent,
    RegisterCustomerFormComponent,
    RegisterCustomerComponent,
    PageNotFoundComponent,
    RegisterMerchantComponent,
    RegisterMerchantFormComponent,
    DashboardComponent,
    RegisterMerchantStepperComponent,
    RegisterMerchantFormTwoComponent,
    HomeProductsComponent,
    DashboardAccountManagementComponent,
    MerchantDetailComponent,
    ProductManagementComponent,
    ChangeMerchantPasswordComponent,
    CreateNewProductComponent,
    EditProductComponent,
    ProductComponent,
    ProductsComponent,
    CheckoutProductComponent,
    ReviewTourismProductComponent,
    ReviewPagesComponent,
    ViewAnalyticsReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkStepperModule,
  ],
  exports: [
    CdkStepperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
