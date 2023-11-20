import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn: boolean = false;
  isOpen: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    Swal.fire({
      icon: "question",
      title: 'Are you sure want to Logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user_id');
        this.authService.isLoggedIn$.next(false);
        this.router.navigate(['/login']);
        Swal.fire('Logout successfully!', '', 'success');
      } else {
        Swal.fire('Okay, Logout canceled!', '', 'info');
      }
    });
  }
}
