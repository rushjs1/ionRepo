import { Component } from "@angular/core";

import { Plugins } from "@capacitor/core";
const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor() {
    StatusBar.hide().catch(err => {
      console.warn(err);
    });
    SplashScreen.hide().catch(err => {
      console.warn(err);
    });
  }
}
