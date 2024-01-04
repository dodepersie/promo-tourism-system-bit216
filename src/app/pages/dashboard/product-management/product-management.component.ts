import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { SwalService } from 'src/app/_services/swal.service';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements OnInit {
  productData: Product[] = [];
  constructor(
    private productService: ProductService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      this.productService.getProductByMerchantId(userId).subscribe({
        next: (products) => {
          this.productData = products;
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }

  deleteProduct(id: string, name: string) {
    this.swalService
      .swalWithDialog(`Are you sure want to delete ${name}?`)
      .then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(id).subscribe({
            next: () => {
              this.getProducts();
              this.swalService.successSwal(`${name} deleted sucessfully!`);
            },
            error(err) {
              console.error(err);
            },
          });
        } else {
          this.swalService.infoSwal(`${name} not deleted!`);
        }
      });
  }
}
