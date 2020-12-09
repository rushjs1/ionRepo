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
  selector: "app-post-details",
  templateUrl: "./post-details.page.html",
  styleUrls: ["./post-details.page.scss"]
})
export class PostDetailsPage implements OnInit, OnDestroy {
  map: Leaflet.Map;
  public blogName: any = "";
  public blogContent: any = "";
  public blogObj: any = [];
  constructor(
    public firestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    public firestorage: AngularFireStorage,
    public modelService: ModelService
  ) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = Leaflet.map("mapId4").setView([28.6448, 77.216721], 5);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "edupala.com © Angular LeafLet"
    }).addTo(this.map);
  }

  logout() {
    this.modelService.logOut();
  }
  goBack() {
    this.modelService.navToBrowse();
  }
  editPost(data) {
    console.log(data);
    this.router.navigate(["/edit-post"]);

    // handle
  }
  deletePost(data) {
    //handle
    this.modelService.deleteThePost(data);
  }
  ngOnDestroy() {
    this.map.remove();
  }
}
