import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from "@angular/router";
import { ModelService } from "../services/model.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"]
})
export class EditPage implements OnInit {
  public desiredUpdatedDisplayName: any = "";
  public file: any = {};
  public desiredUpdatedDescription: any = "";
  public desiredUpdatedLooking: any = "";

  @ViewChild("fileButton") fileButton;
  constructor(
    public modelService: ModelService,
    public router: Router,
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.modelService.getUserFirestoreData();
  }
  logout() {
    this.modelService.logout();
  }

  submitChangesToProfile() {
    console.log(this.desiredUpdatedDisplayName);
    this.modelService.letsUpdateProfile(this.desiredUpdatedDisplayName);
    this.modelService.updataUserFirestoreInfo(
      this.desiredUpdatedDescription,
      this.desiredUpdatedLooking
    );
    this.modelService.getUserFirestoreData();
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
  goBrowse() {
    this.router.navigate(["/profile"]);
    this.modelService.updateBrowseOnViewEnter();
  }
}
