import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from "@angular/router";
import { ModelService } from "../services/model.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: "app-next",
  templateUrl: "./next.page.html",
  styleUrls: ["./next.page.scss"]
})
export class NextPage implements OnInit {
  public file: any = {};
  public desiredDisplayName: any = "";

  @ViewChild("fileButton") fileButton;
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

  onSelect(event) {
    this.file = event.target.files[0];

    this.modelService.sendPhotoToStorage(this.file).then(() => {
      this.modelService.updateProfilePhotoAfterAuth(this.file);
    });
    //this.router.navigate(["/browse"]);
  }

  uploadFile() {
    this.fileButton.nativeElement.click();
  }

  submitDisplayName() {
    console.log(this.desiredDisplayName);
    this.modelService.updateProfileDisplayName(this.desiredDisplayName);
    this.router.navigate(["/shots"]);
  }
}
