import { Component, OnInit } from '@angular/core';
import { MerchantService } from 'src/app/_services/merchant.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/user';
import { Merchant } from 'src/app/merchant';

@Component({
  selector: 'app-dashboard-user-index',
  templateUrl: './dashboard-user-index.component.html',
  styleUrls: ['./dashboard-user-index.component.css'],
})
export class DashboardUserIndexComponent implements OnInit {
  userData: User | undefined;
  merchantData: Merchant | undefined;
  constructor(
    private userService: UserService,
    private merchantService: MerchantService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const userId = localStorage.getItem('user_id');
    if (userId !== null) {
      this.userService.getUser(userId).subscribe({
        next: (userData) => {
          this.userData = userData;
        },
        error: (error) => {
          console.error(error);
        },
      });

      this.merchantService.getMerchant(userId).subscribe({
        next: (merchantData) => {
          this.merchantData = merchantData;
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      console.error('User ID not found in localStorage');
    }
  }
}
