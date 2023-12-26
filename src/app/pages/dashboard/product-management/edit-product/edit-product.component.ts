import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { SwalService } from 'src/app/_services/swal.service';
import { Merchant } from 'src/app/merchant';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  merchant: Merchant | undefined;
  product: Product | undefined;
  editProductForm: FormGroup = new FormGroup({});

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private swalService: SwalService,
  ) {}

  get merchant_id() {
    return this.editProductForm.get('merchant_id');
  }
  get name() {
    return this.editProductForm.get('name');
  }
  get price() {
    return this.editProductForm.get('price');
  }
  get image() {
    return this.editProductForm.get('image');
  }
  get address() {
    return this.editProductForm.get('address');
  }
  get state() {
    return this.editProductForm.get('state');
  }
  get city() {
    return this.editProductForm.get('city');
  }
  get description() {
    return this.editProductForm.get('description');
  }

  ngOnInit(): void {
    this.getData();

    this.editProductForm = new FormGroup({
      merchant_id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  getData() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.productService.getProduct(productId).subscribe({
          next: (product) => {
            this.product = product;

            // Prefill the form with the retrieved product data
            this.editProductForm.patchValue({
              merchant_id: product.merchant_id,
              name: product.name,
              price: product.price,
              image: product.image,
              address: product.address,
              state: product.state,
              city: product.city,
              description: product.description,
            });
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        console.error('Product ID not found in URL');
      }
    });
  }

  editProduct() {
    this.route.params.subscribe((params) => {
      const userId = params['id'];

      if (userId) {
        this.productService
          .editProduct(userId, this.editProductForm.value)
          .subscribe({
            next: (product) => {
              const parsedProduct = JSON.parse(product);
              this.router.navigate(['/user-dashboard/product-management']);
              this.swalService.successSwal(`${parsedProduct.name} edited successfully!`)
            },
            error(err) {
              console.error(err);
            },
          });
      }
    });
  }
}
