import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreepPage } from './creep.page';

describe('CreepPage', () => {
  let component: CreepPage;
  let fixture: ComponentFixture<CreepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreepPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
