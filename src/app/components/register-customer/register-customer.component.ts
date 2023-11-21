import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user';
import { UserService } from '../../_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-customer',
  template: `
    <app-home>
      <div class="py-10 p-4">
        <div
          class="container mx-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow space-y-4"
        >
          <app-register-customer-form
            (formSubmitted)="addUser($event)"
          ></app-register-customer-form>

          <p class="text-sm">
            Are you a merchant?
            <a
              routerLink="/register-merchant"
              class="text-blue-500 underline hover:no-underline"
              >Register as a Merchant!</a
            >
          </p>

          <p class="text-sm">
            Already have an account?
            <a
              routerLink="/login"
              class="text-blue-500 underline hover:no-underline"
              >Login!</a
            >
          </p>
        </div>
      </div>
    </app-home>
  `,
})
export class RegisterCustomerComponent {
  constructor(private router: Router, private userService: UserService) {}

  addUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Register Success!',
          text: 'You can explore and enjoy PromoTourism now!',
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        let errorMessage =
          'Failed to create User, try to contact Administrator!';

        if (err.error) {
          errorMessage = err.error;
        }

        Swal.fire({
          icon: 'error',
          title: 'Register Failed!',
          text: errorMessage,
        });
      },
    });
  }
}
