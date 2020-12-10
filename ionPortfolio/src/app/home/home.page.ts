import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ModelServiceService } from "../services/model-service.service";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    public modelService: ModelServiceService,
    public router: Router
  ) {}

  goProjects() {
    this.router.navigate(["/projects"]);
  }
}
