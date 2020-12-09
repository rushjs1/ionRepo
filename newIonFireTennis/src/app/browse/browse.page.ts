import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from "@angular/router";
import { ModelService } from "../services/model.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: "app-browse",
  templateUrl: "./browse.page.html",
  styleUrls: ["./browse.page.scss"]
})
export class BrowsePage implements OnInit {
  constructor(
    public modelService: ModelService,
    public router: Router,
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.modelService.getFireStoreData();
    this.modelService.getUserFirestoreData();
  }
  logout() {
    this.modelService.logout();
  }
  goProfile() {
    this.router.navigate(["/profile"]);
  }
  creepUser(data) {
    //call service and retrieve info
    this.modelService.getCreepDetails(data);

    //nav to creep
  }

  /*   ionViewWillEnter() {
    this.modelService.getFireStoreData();
  } */
}
