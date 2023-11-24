import { Component, OnInit } from '@angular/core';
import { MerchantService } from 'src/app/_services/merchant.service';
import { Merchant } from 'src/app/merchant';

@Component({
  selector: 'app-dashboard-account-management',
  templateUrl: './dashboard-account-management.component.html',
  styleUrls: ['./dashboard-account-management.component.css'],
})
export class DashboardAccountManagementComponent implements OnInit {
  pendingMerchants: Merchant[] = [];

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.merchantService.getMerchants().subscribe({
        next: (allMerchants) => {
          this.pendingMerchants = allMerchants.filter(
            (merchant) => merchant.status === 'Pending'
          );
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
