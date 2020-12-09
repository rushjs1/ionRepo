import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from "@angular/router";
import { ModelService } from "../services/model.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: "app-shots",
  templateUrl: "./shots.page.html",
  styleUrls: ["./shots.page.scss"]
})
export class ShotsPage implements OnInit {
  public lookingFor: any = "";
  public lookingSingles: any = "Singles";
  public lookingDoubles: any = "Doubles";
  public lookingBoth: any = "Both";
  public user: any = firebase.auth().currentUser;
  public shotsArray: any = [];
  public profileDescription: any = "";

  constructor(
    public modelService: ModelService,
    public router: Router,
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  ngOnInit() {}
  singles() {
    if (this.lookingFor == !this.lookingSingles) {
      this.lookingFor = this.lookingSingles;
      console.log(this.lookingFor);
      this.shotsArray = [
        this.lookingFor,
        this.user.displayName,
        this.user.uid,
        this.profileDescription
      ];
      console.log(this.shotsArray);
      this.modelService.getShotsDetails(this.shotsArray);
    }
  }
  doubles() {
    if (this.lookingFor == !this.lookingDoubles) {
      this.lookingFor = this.lookingDoubles;
      console.log(this.lookingFor);
      this.shotsArray = [
        this.lookingFor,
        this.user.displayName,
        this.user.uid,
        this.profileDescription
      ];
      console.log(this.shotsArray);
      this.modelService.getShotsDetails(this.shotsArray);
    }
  }
  both() {
    if (this.lookingFor == !this.lookingBoth) {
      this.lookingFor = this.lookingBoth;
      console.log(this.lookingFor);
      this.shotsArray = [
        this.lookingFor,
        this.user.displayName,
        this.user.uid,
        this.profileDescription
      ];
      console.log(this.shotsArray);
      this.modelService.getShotsDetails(this.shotsArray);
    }
  }
  logout() {
    this.modelService.logout();
  }
}
