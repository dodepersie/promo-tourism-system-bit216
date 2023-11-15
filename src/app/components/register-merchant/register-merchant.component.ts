import { Component } from '@angular/core';

@Component({
  selector: 'app-register-merchant',
  template: `
    <app-home>
      <div class="py-10 p-4">
        <div
          class="container mx-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow space-y-4"
        >
          <app-register-merchant-form

          ></app-register-merchant-form>

          <p class="text-sm">Already have an account? <a routerLink="/login" class="text-blue-500 underline hover:no-underline">Login!</a></p>

        </div>
      </div>
    </app-home>
  `,  styleUrls: ['./register-merchant.component.css']
})
export class RegisterMerchantComponent {

}
