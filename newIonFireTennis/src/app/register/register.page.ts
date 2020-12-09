import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from "@angular/router";
import { ModelService } from "../services/model.service";
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  public email: any = "";
  public password: any = "";
  public registerPackage: any = [];

  constructor(
    public modelService: ModelService,
    public router: Router,
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  ngOnInit() {}

  register() {
    this.registerPackage.push(this.email, this.password);
    this.modelService.registerUser(this.registerPackage);
  }
}
