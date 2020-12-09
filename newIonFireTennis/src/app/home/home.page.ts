import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from "@angular/router";
import { ModelService } from "../services/model.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  public email: any = "";
  public password: any = "";
  public signInPackage: any = [];

  constructor(
    public modelService: ModelService,
    public router: Router,
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  getLogin() {
    this.signInPackage.push(this.email, this.password);

    console.log(this.signInPackage);
    this.modelService.login(this.signInPackage);
  }
}
