import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event as RouterEvent,
} from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'PromoTourism for BIT216';
  showLoader = true;

  constructor(private router: Router) {
    this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e)
    })
  }

  ngOnInit(): void {
    initFlowbite();
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showLoader = true
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.showLoader = false
      }, 500)
    }

    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.showLoader = false
      }, 500)
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.showLoader = false
      }, 500)
    }
  }
}
