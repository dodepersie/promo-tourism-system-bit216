import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { GlobalService } from 'src/app/_services/global.service';
import { SwalService } from 'src/app/_services/swal.service';
import { User } from '../../user';
import { UserService } from '../../_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public globalService: GlobalService,
    private swalService: SwalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  ngOnDestroy() {
    this.globalService.isModalLoginOpen = false;
    this.globalService.isModalRegisterOpen = false;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  openLoginModal(bool: boolean) {
    this.globalService.isModalLoginOpen = bool;
    this.globalService.isModalRegisterOpen = false;
  }

  openRegisterModal(bool: boolean) {
    this.globalService.isModalRegisterOpen = bool;
    this.globalService.isModalLoginOpen = false;
  }

  addUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: () => {
        this.swalService.successSwal(
          'Register success!, you can explore and enjoy PromoTourism now!'
        );
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([this.router.url]);
          });
      },
      error: (err) => {
        let errorMessage =
          'Failed to create User, try to contact Administrator!';

        if (err.error) {
          errorMessage = err.error;
        }

        this.swalService.errorSwal(errorMessage);
      },
    });
  }

  logout() {
    this.swalService
      .swalWithDialog('Are you sure want to Log Out?')
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('user_id');
          localStorage.removeItem('__paypal_storage__');
          localStorage.removeItem('token');
          this.authService.isLoggedIn$.next(false);
          this.router.navigate(['/']);
          this.swalService.successSwal(
            'Okay, you have been Log Out successfully!'
          );
        } else {
          this.swalService.infoSwal('Okay, Log Out cancelled!');
        }
      });
  }
}
