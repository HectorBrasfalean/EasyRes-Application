import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeukenComponent } from './keuken.component';
import { HttpClientModule } from '@angular/common/http';

describe('KeukenComponent', () => {
  let component: KeukenComponent;
  let fixture: ComponentFixture<KeukenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ KeukenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeukenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
