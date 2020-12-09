import { Component, OnInit, OnDestroy } from "@angular/core";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import firebase from "firebase/app";
import { AngularFireStorage } from "@angular/fire/storage";
import { ModelService } from "../services/model.service";

import * as Leaflet from "leaflet";
@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.page.html",
  styleUrls: ["./edit-post.page.scss"]
})
export class EditPostPage implements OnInit, OnDestroy {
  map: Leaflet.Map;
  public blogName: any = "";
  public blogContent: any = "";
  public blogObj: any = [];
  public desiredUpdatedPostString: any = "";
  public newUpdatedPackage: any = [];
  public desiredUpdatedPostName: any = "";

  constructor(
    public firestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    public firestorage: AngularFireStorage,
    public modelService: ModelService
  ) {}

  ngOnInit() {
    alert(
      "If you Leave a field blank upon submission its contents will be erased! Fill in all fields before submitting, or use the back button. Thanks, Have a great day!"
    );
  }
  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = Leaflet.map("mapId3").setView([28.6448, 77.216721], 5);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "edupala.com © Angular LeafLet"
    }).addTo(this.map);
  }

  logout() {
    this.modelService.logOut();
  }
  goBack() {
    this.router.navigate(["/browse"]);
  }
  submitUpdate(data) {
    //send back
    this.newUpdatedPackage.push(
      data,
      this.desiredUpdatedPostString,
      this.desiredUpdatedPostName
    );
    this.modelService.getDesiredUpdate(this.newUpdatedPackage);
    alert(
      "Thanks for Updating your Blog! Well save it for you. 😎... Have a Great Day!"
    );
    this.router.navigate(["/browse"]);
  }
  ngOnDestroy() {
    this.map.remove();
  }
}
