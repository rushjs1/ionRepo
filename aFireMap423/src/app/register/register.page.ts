import { Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import firebase from "firebase/app";
import { AngularFireStorage } from "@angular/fire/storage";
import { ModelService } from "../services/model.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
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

  register() {
    this.userAuthInfo.push(this.email, this.password);
    this.modelService.registerUser(this.userAuthInfo);
  }
  logout() {
    this.modelService.logOut();
  }
}
