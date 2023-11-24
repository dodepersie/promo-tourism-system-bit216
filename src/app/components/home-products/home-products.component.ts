import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css'],
})
export class HomeProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = this.randomizeProducts(products);
      }, error(err) {
          console.error(err);
      },
    })
  }

  randomizeProducts(array: any[]): any[] {
    const shuffled = array.slice();
    let currentIndex = shuffled.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }

    return shuffled;
  }
}
