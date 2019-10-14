import { Component, OnInit } from '@angular/core';
import { RestaurantService, IRestaurant } from '../services/restaurant.service';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  Restaurants : IRestaurant[];
  moreInfo: boolean = false;
  moreInfoId: number;

  reserve: boolean = false;
  reserveId: number;
  constructor(private ResService : RestaurantService) { }

  async ngOnInit() {
    this.ResService.GetRestaurants().subscribe(restaurants => {
      this.Restaurants = restaurants;
  })
  }
  getMoreInfo(restaurant: IRestaurant){
    this.moreInfoId = restaurant.restaurantId;
    this.moreInfo = true;
  }

  reserveRes(restaurant: IRestaurant){
    this.reserveId = restaurant.restaurantId;
  }
}