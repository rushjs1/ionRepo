import { Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import firebase from "firebase/app";
import { AngularFireStorage } from "@angular/fire/storage";
import { ModelService } from "../services/model.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public email: any = "";
  public password: any = "";
  public userAuthInfo: any = [];

  constructor(
    public firestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    public firestorage: AngularFireStorage,
    public modelService: ModelService
  ) {}

  ngOnInit() {}
  login() {
    this.userAuthInfo.push(this.email, this.password);
    this.modelService.login(this.userAuthInfo);
  }
  logout() {
    this.modelService.logOut();
  }
  goRegister() {
    this.router.navigate(["/register"]);
  }
}
