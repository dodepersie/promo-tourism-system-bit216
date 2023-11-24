import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login/login.component';
import { RegisterMerchantComponent } from './components/register-merchant/register-merchant.component';
import { DashboardUserIndexComponent } from './pages/dashboard/user-dashboard/dashboard-user-index.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardAccountManagementComponent } from './pages/dashboard/account-management/dashboard-account-management.component';
import { MerchantDetailComponent } from './pages/dashboard/account-management/merchant-detail/merchant-detail.component';
import { ProductManagementComponent } from './pages/dashboard/product-management/product-management.component';
import { ChangeMerchantPasswordComponent } from './pages/dashboard/change-merchant-password/change-merchant-password.component';
import { CreateNewProductComponent } from './pages/dashboard/product-management/create-new-product/create-new-product.component';
import { EditProductComponent } from './pages/dashboard/product-management/edit-product/edit-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { CheckoutProductComponent } from './pages/checkout-product/checkout-product.component';

const routes: Routes = [
  { path: '', component: HomeMainComponent, title: 'PromoTourism: Home' },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'PromoTourism: Login',
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterCustomerComponent,
    title: 'PromoTourism: Register as Customer',
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductsComponent,
        title: 'PromoTourism: All Products',
      },
      {
        path: ':id',
        component: ProductComponent,
        title: async (route) => {
          const productId = route.params['id'];
          try {
            const response = await fetch(
              `http://localhost:8000/api/products/${productId}`
            );
            const productData = await response.json();
            const productName = productData.name;
            return `PromoTourism: ${productName}`;
          } catch (error) {
            return 'PromoTourism: Viewing Product';
          }
        },
      },
    ],
  },
  {
    path: 'checkout',
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: CheckoutProductComponent,
        title: 'PromoTourism: Checkout',
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'register-merchant',
    component: RegisterMerchantComponent,
    title: 'PromoTourism: Register as Merchant',
    canActivate: [AuthGuard],
  },
  {
    path: 'user-dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardUserIndexComponent,
        title: 'PromoTourism: Dashboard',
      },
      {
        path: 'account-management',
        children: [
          {
            path: '',
            component: DashboardAccountManagementComponent,
            title: 'PromoTourism: Account Management',
          },
          {
            path: ':id',
            component: MerchantDetailComponent,
            title: 'PromoTourism: View Detail',
          },
        ],
      },
      {
        path: 'product-management',
        children: [
          {
            path: '',
            component: ProductManagementComponent,
            title: 'PromoTourism: Product Management',
          },
          {
            path: 'create',
            component: CreateNewProductComponent,
            title: 'PromoTourism: Create New Product',
          },
          {
            path: 'edit/:id',
            component: EditProductComponent,
            title: 'PromoTourism: Edit Product',
          },
        ],
      },
      {
        path: 'change-merchant-password',
        component: ChangeMerchantPasswordComponent,
        title: 'PromoTourism: Change Merchant Password',
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent, title: '404 - Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
