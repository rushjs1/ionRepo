import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShotsPage } from './shots.page';

describe('ShotsPage', () => {
  let component: ShotsPage;
  let fixture: ComponentFixture<ShotsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShotsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
