import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements OnInit {
  productData: Product[] = [];
  constructor(private productService: ProductService) {}

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
    Swal.fire({
      icon: "question",
      title: `Are you sure want to delete ${name}?`,
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            // Refresh Data
            this.getProducts();

            Swal.fire(`${name} deleted successfully!`, '', 'success');
          }, error(err) {
              console.error(err);
          },
        });
      } else {
        Swal.fire(`${name} not deleted!`, '', 'info');
      }
    });
  }
}
