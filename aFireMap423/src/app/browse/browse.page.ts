import { Component, OnInit, OnDestroy } from "@angular/core";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import firebase from "firebase/app";
import { AngularFireStorage } from "@angular/fire/storage";
import { ModelService } from "../services/model.service";
import * as Leaflet from "leaflet";
import { antPath } from "leaflet-ant-path";

@Component({
  selector: "app-browse",
  templateUrl: "./browse.page.html",
  styleUrls: ["./browse.page.scss"]
})
export class BrowsePage implements OnInit, OnDestroy {
  map: Leaflet.Map;
  constructor(
    public firestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    public firestorage: AngularFireStorage,
    public modelService: ModelService
  ) {}
  ngOnInit() {
    this.modelService.getFirestoreData();
  }

  logout() {
    this.modelService.logOut();
  }
  ionViewDidEnter() {
    if (!this.map) {
      this.loadMap();
    }
  }

  loadMap() {
    this.map = Leaflet.map("mapId").setView([28.6448, 77.216721], 5);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "edupala.com © Angular LeafLet"
    }).addTo(this.map);
  }

  createBlogRequest() {
    this.modelService.navCreateBlog();
  }

  viewBlogDetails(data) {
    //  console.log(data);
    this.modelService.getPostDetails(data);
    this.router.navigate(["/post-details"]);
  }
  refresh() {
    this.modelService.refreshFirestoreData();
    //  this.modelService.login(this.modelService.userAuthInfo);
  }

  ngOnDestroy() {
    this.map.remove();
  }
}
