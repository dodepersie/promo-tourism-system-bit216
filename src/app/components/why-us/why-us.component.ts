import { Component } from '@angular/core';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
})
export class WhyUsComponent {
  datas: { title: string; content: string }[] = [
    {
      title: 'Find your Happiness',
      content:
        'Traveling is one way to make you happy. In PromoTourism there is a thousand of places available.',
    },
    {
      title: 'Offer and Discount',
      content: 'Quality activities. Best price for everyone! Like our name PromoTourism, we always make a good Promo!',
    },
    { title: 'Book from Anywhere', content: "It doesn't matter if you like to plan ahead or if you are the spontaneous type. Have the freedom to make secure bookings on the go and get instant confirmations." },
    { title: 'Helpful Reviews', content: "Everyone's experience matters and we believe in the importance of honest feedback and reviews. Make informed decisions based on not just the information we provide, but also the insights of previous travelers." },
  ];
}
