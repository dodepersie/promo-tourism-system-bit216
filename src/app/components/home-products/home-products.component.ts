import { Component } from '@angular/core';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css'],
})
export class HomeProductsComponent {
  products: {
    id: number;
    name: string;
    detail: string;
    price: string;
    image: string;
    rating: number;
  }[] = [
    {
      id: 1,
      name: 'Petronas Twin Tower',
      detail:
        'The Petronas Towers or Petronas Twin Towers in Kuala Lumpur, Malaysia, are a pair of twin towers that were once the tallest buildings in the world in 1998-2004, before being surpassed by the Burj Khalifa and Taipei 101. However, these two towers are still the tallest twin towers in the world in this century. 20th.',
      price: '0',
      image: 'https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/1000515687908/Petronas-Twin-Towers-Kuala-Lumpur-1928268d-4526-4a28-a88b-453cd5f170a1.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-720,q-60,w-1280',
      rating: 5
    },
    {
      id: 2,
      name: 'Aquaria KLCC',
      detail:
        'The Aquaria KLCC is an oceanarium located beneath the Kuala Lumpur Convention Center within Kuala Lumpur City Center in Kuala Lumpur, Malaysia.',
      price: '18',
      image: 'https://www.blibli.com/friends-backend/wp-content/uploads/2022/12/panduan-wisata-aquaria-klcc.jpeg',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Genting Highlands Premium Outlet',
      detail:
        'Spacious outdoor shopping center with many well-known outlet stores and a diverse food court.',
      price: '0',
      image: 'https://res.klook.com/image/upload/c_fill,w_1265,h_712/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/csyejhux05o1ypzsipuz.webp',
      rating: 5
    },
  ];
}
