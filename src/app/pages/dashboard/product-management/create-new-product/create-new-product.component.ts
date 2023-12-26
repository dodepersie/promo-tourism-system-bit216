import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MerchantService } from 'src/app/_services/merchant.service';
import { ProductService } from 'src/app/_services/product.service';
import { SwalService } from 'src/app/_services/swal.service';
import { Merchant } from 'src/app/merchant';

@Component({
  selector: 'app-create-new-product',
  templateUrl: './create-new-product.component.html',
  styleUrls: ['./create-new-product.component.css'],
})
export class CreateNewProductComponent implements OnInit {
  merchant: Merchant | undefined;
  createNewProductForm: FormGroup = new FormGroup({});

  constructor(
    private productService: ProductService,
    private merchantService: MerchantService,
    private swalService: SwalService,
    private router: Router
  ) {}

  get merchant_id() {
    return this.createNewProductForm.get('merchant_id');
  }
  get name() {
    return this.createNewProductForm.get('name');
  }
  get price() {
    return this.createNewProductForm.get('price');
  }
  get image() {
    return this.createNewProductForm.get('image');
  }
  get address() {
    return this.createNewProductForm.get('address');
  }
  get state() {
    return this.createNewProductForm.get('state');
  }
  get city() {
    return this.createNewProductForm.get('city');
  }
  get description() {
    return this.createNewProductForm.get('description');
  }

  ngOnInit(): void {
    this.getUser();

    this.createNewProductForm = new FormGroup({
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

  getUser() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.merchantService.getMerchant(userId).subscribe({
        next: (merchant) => {
          this.merchant = merchant;

          this.createNewProductForm.patchValue({
            merchant_id: merchant._id,
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      console.log('User with that ID not found on local storage..');
    }
  }

  createProduct() {
    this.productService
      .createProduct(this.createNewProductForm.value)
      .subscribe({
        next: (product) => {
          const productParsed = JSON.parse(product);
          this.swalService.successSwal(
            `${productParsed.name} added successfully!`
          );
          this.router.navigate(['/user-dashboard/product-management']);
        },
        error(err) {
          console.error(err);
        },
      });
  }
}
