import { Component, OnInit } from '@angular/core';
import { DataService, IProduct, IBestelling } from '../data.service';

@Component({
  selector: 'app-keuken',
  templateUrl: './keuken.component.html',
  styleUrls: ['./keuken.component.scss']
})
export class KeukenComponent implements OnInit {

  Bestellingen: IBestelling[];
  UpdateBestelling: IBestelling;

  ProcessList: IBestelling[];
  DoneList: IBestelling[];

  constructor(private serv: DataService) { }

  ngOnInit() {
    this.serv.GetAlleVoedingsbestellingen().subscribe(result => {
      this.Bestellingen = result;
      this.Checklist();
    });
  }

  Back(bestelling: IBestelling) {
    bestelling.etenGereed = false;
    this.serv.PutVoedingsbestelling(bestelling).subscribe(res => {
      this.serv.GetAlleVoedingsbestellingen().subscribe(result => {
        this.Bestellingen = result;
        this.Checklist();
      });
    });
  }

  Done(bestelling: IBestelling) {
    bestelling.etenGereed = true;
    this.serv.PutVoedingsbestelling(bestelling).subscribe(res => {
      this.serv.GetAlleVoedingsbestellingen().subscribe(result => {
        this.Bestellingen = result;
        this.Checklist();
      });
    });
  }

  Checklist() {
    this.DoneList = [];
    this.ProcessList = [];

    this.Bestellingen.forEach(element => {
      if (element.etenGereed) {
        this.DoneList.push(element);
      } else {
        this.ProcessList.push(element);
      }
    });
  }
}
