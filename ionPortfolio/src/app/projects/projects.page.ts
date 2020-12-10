import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.page.html",
  styleUrls: ["./projects.page.scss"]
})
export class ProjectsPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  alertThis() {
    alert(
      "NOTE: THIS REQUEST TAKES AN AVERAGE OF 10 SECONDS TO PROCESS. Additionly, unfortunatly the request is still not compatible with most mobile phone browsers, Sorry."
    );
  }
}
