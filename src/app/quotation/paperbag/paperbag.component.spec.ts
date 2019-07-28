import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperbagComponent } from './paperbag.component';

describe('PaperbagComponent', () => {
  let component: PaperbagComponent;
  let fixture: ComponentFixture<PaperbagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperbagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperbagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
