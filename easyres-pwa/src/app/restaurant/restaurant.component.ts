import { Component, OnInit } from '@angular/core';
import { RestaurantService, IRestaurant } from '../services/restaurant.service';
import { MsalService } from '../services/msal.service';
import { GoogleAnalyticsService } from '../services/google-analytics.service';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  Restaurants : IRestaurant[];
  sorterenOp: string = "Aanbevolen";
  
  constructor(private ResService : RestaurantService, private msalService: MsalService, private analytics: GoogleAnalyticsService) { }

  SendEvent(buttonNaam: string) {
    this.analytics.eventEmitter("userPage", buttonNaam, "userLabel", 1);
  }

  zoeknaam: string;
  zoekterm: string;
  sorteerKeuzes: string[] = ["Aanbevolen","Naam","Type","Soort","Gemeente","Land"];
  types: type[] = [{naam: "Restaurant",active:true},{naam: "Taverne",active:true},{naam: "Bistro",active:true},{naam: "Trattoria",active:true}]
  UserId: string;

  filter: string = "";
  landen: string[] = ["België","Nederland"];
  gemeentes: string[] = [];
  GemeentesBelgie: string[] = ["Sint-Niklaas","Antwerpen","Sint-Gillis-Waas"];
  GemeentesNederland: string[] = ["Amsterdam","Rotterdam","Den Haag","Groningen"];
  filters: filters[] = [
    {naam: "Land", value: "", active: false},
    {naam: "Gemeente", value: "", active: false}
  ];
  
  async ngOnInit() {
    if(this.isUserLoggedIn()){
      this.GetUserObjectId();
    }
    await this.GetRestaurants();
  }
  Zoeken(){
    this.zoekterm = `naam=${this.zoeknaam}`;
    this.GetRestaurants();
  }
  Sorteren(item){
    this.sorterenOp = item;
    this.ResService.sortBy = item;
    if(this.zoeknaam != null && this.zoeknaam != "")
      this.Zoeken();
    else
      this.GetRestaurants();
  }
  async GetRestaurants(){
    var temp: IRestaurant[] = [];
    for(var element of this.types){
      if (element.active) {
        var tempRestaurants = await this.ResService.GetRestaurants(`${this.zoekterm}&soort=${element.naam}&${this.filter}`);
        tempRestaurants.forEach(element => {
          temp.push(element);
        });
      }
    }
    this.Restaurants = temp;
    if(this.isUserLoggedIn()){
      await this.CheckFavorites();
    }
  }
  ChangeTypes(type){
    type.active = !type.active;
    this.GetRestaurants();
  }
  ChangeFilter(filter){
    filter.active = !filter.active;
  }
  async ApplyFilters(){
    this.filter = "";
    for(var element of this.filters){
      if (element.active && element.value != "") {
        this.filter += `&${element.naam.toLowerCase()}=${element.value}`
      }
    }
    await this.GetRestaurants()
  }
  ChangeLocation(filterGiven:filters){
    if(filterGiven.naam == "Land"){
      return this.landen;
    }
    else if(filterGiven.naam == "Gemeente"){
      if(this.filters[0].value == "België"){
        return this.GemeentesBelgie;
      }
      else if (this.filters[0].value == "Nederland"){
        return this.GemeentesNederland;
      }
    }
    return [""];
  }
  isUserLoggedIn() {
    return this.msalService.isLoggedIn();
  }
  GetUserObjectId(){
    this.UserId = this.msalService.getUserObjectId();
  }
  AddDeleteFavorites(Restaurantid: number, index){
    if(this.RestaurantsFavoriteBooleans[index]){
      this.ResService.DeleteFavoritesByID(this.UserId, Restaurantid).subscribe();
    }
    else{
      this.ResService.PostFavorite(this.UserId,Restaurantid).subscribe();
    }
    this.RestaurantsFavoriteBooleans[index] = !this.RestaurantsFavoriteBooleans[index];
  }
  FavoriteRestaurants: IRestaurant[] = []
  async GetUserFavorites(){
    var tempGebruiker = await this.ResService.GetFavorites(this.UserId,"");
    this.FavoriteRestaurants = tempGebruiker.favorieten;
  }
  RestaurantsFavoriteBooleans: boolean[] = [];
  async CheckFavorites(){
    await this.GetUserFavorites();
    this.RestaurantsFavoriteBooleans = [];
    this.Restaurants.forEach(element => {
      if(this.FavoriteRestaurants.find(x => x.restaurantId === element.restaurantId))
        this.RestaurantsFavoriteBooleans.push(true);
      else
      this.RestaurantsFavoriteBooleans.push(false);
    });
  }
  async ngDoCheck() 
  {
    if(this.UserId == null && this.isUserLoggedIn()){
        this.GetUserObjectId();
        await this.CheckFavorites();
    }
  }

}
export interface type{
  naam: string;
  active: boolean;
}
export interface filters{
  naam: string;
  value: string;
  active: boolean;
}