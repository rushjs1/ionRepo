import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from "@angular/router";
import { ModelService } from "../services/model.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: "app-creep",
  templateUrl: "./creep.page.html",
  styleUrls: ["./creep.page.scss"]
})
export class CreepPage implements OnInit {
  constructor(
    public modelService: ModelService,
    public router: Router,
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  ngOnInit() {}
  logout() {
    this.modelService.logout();
  }
}
