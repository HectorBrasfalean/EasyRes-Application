import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { RestaurantInfoComponent } from './restaurant-info.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2CompleterModule } from 'ng2-completer';
import { RouterModule } from '@angular/router';

describe('RestaurantInfoComponent', () => {
  let component: RestaurantInfoComponent;
  let fixture: ComponentFixture<RestaurantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule, RouterModule.forRoot([]), Ng2CompleterModule, ZXingScannerModule ],
      declarations: [RestaurantInfoComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
