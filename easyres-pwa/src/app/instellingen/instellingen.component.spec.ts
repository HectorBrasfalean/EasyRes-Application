import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstellingenComponent } from './instellingen.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MsalService } from '../services/msal.service';
import { RouterModule } from '@angular/router';

describe('InstellingenComponent', () => {
  let component: InstellingenComponent;
  let fixture: ComponentFixture<InstellingenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterModule.forRoot([])],
      declarations: [ InstellingenComponent ],
      providers: [ MsalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstellingenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
