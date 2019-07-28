import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlasticbagComponent } from './plasticbag.component';

describe('PlasticbagComponent', () => {
  let component: PlasticbagComponent;
  let fixture: ComponentFixture<PlasticbagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlasticbagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlasticbagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
