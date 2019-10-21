import { Component, OnInit } from '@angular/core';
import { RestaurantService, IReservatie, IRestaurant } from '../services/restaurant.service'
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-reservatie',
  templateUrl: './reservatie.component.html',
  styleUrls: ['./reservatie.component.scss']
})
export class ReservatieComponent implements OnInit {

  restaurantId: number;

  tempReservatie: IReservatie = {naam:null,datum:null,email:null,nummer:null,tijdstip:null,aantal:null};
  finalReservatie: IReservatie;
  restaurant: IRestaurant;
  submitted: boolean = false;
  verified: boolean = false;
  today: Date = new Date();

  constructor(private ResService : RestaurantService, private _Activatedroute:ActivatedRoute, private _location: Location) {
    this.today.setTime(Date.now());
  }

  async ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.restaurantId = +params.get('id'); 
    });

    this.ResService.GetRestaurantByID(this.restaurantId).subscribe(result => {
      this.restaurant = result;
    })

    
  }

  submit() {
    this.finalReservatie = this.tempReservatie;
    console.log("verify: " + this.verify(this.finalReservatie))
    if(this.verify(this.finalReservatie)){
      console.log("Verified");
      this.submitted = true;
      this.ResService.PostReservation(this.restaurant, this.finalReservatie);
    }
    else{
      console.log("Not Verified");
    }
  }


  verify(res){
    if(this.isInTime(res) && res.aantal > 0){
      if(this.today.getFullYear() < this.strToDate(res.datum).getFullYear()){
        return true;
      }else{
        if(this.today.getMonth() < this.strToDate(res.datum).getMonth()){
          return true;
        }else{
          if(this.today.getDate() < this.strToDate(res.datum).getDate()){
            return true;
          }else{
            if((this.today.getHours() * 60 + this.today.getMinutes()) < this.stringToMinutes(this.finalReservatie.tijdstip)){
              return true;
            }
          }
        }
      }
    }
    
  }
  //Controleert of dat de gereserveerde tijd een beschikbaar uur is van het restaurant
  isInTime(reservatie){
    var uren = this.stringSplitHHmm(this.dayOfRes(reservatie.datum));
    var open = uren[0];
    var gesloten = uren[1];
    if (this.stringToMinutes(open) < this.stringToMinutes(reservatie.tijdstip) && this.stringToMinutes(reservatie.tijdstip) < this.stringToMinutes(gesloten)){
      return true;
    }
    else{
      return false;
    }
  }
  
  stringSplitHHmm(str){
    //"16:00 - 20:00" => ["16:00","20:00"]
    var strsplit = str.split(" ");
    strsplit.splice(1,1);

    return strsplit;
  }

  stringToMinutes(str){
    var strsplit = str.split(":");
    return +strsplit[0] * 60 + +strsplit[1];
  }

  strToDate(date){
    return new Date(date);
  }

  dayOfRes(date){
    switch (this.strToDate(date).getDay()){
      case 1: { return this.restaurant.openingsuren.maandag}
      case 2: { return this.restaurant.openingsuren.dinsdag}
      case 3: { return this.restaurant.openingsuren.woensdag}
      case 4: { return this.restaurant.openingsuren.donderdag}
      case 5: { return this.restaurant.openingsuren.vrijdag}
      case 6: { return this.restaurant.openingsuren.zaterdag}
      case 7: { return this.restaurant.openingsuren.zondag}
    }
  }

  GoBack(){
    this._location.back();
  }
}
