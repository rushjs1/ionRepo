import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import firebase from "firebase/app";
import { AngularFireStorage } from "@angular/fire/storage";
//import { resolve } from "dns";

@Injectable({
  providedIn: "root"
})
export class ModelService {
  public userAuthInfo: any = [];
  public user: any = [];
  public username: any = "";
  public accountsArray: any = [];
  public profileFile: any = {};
  public storageRef: any = {};
  public sendFileTaskObject: any = {};
  public newProfileFile: any = {};
  public newDisplayName: any = "";
  public creepDetailsArray: any = [];
  public editDisplayName: any = "";
  public indivFireData: any = [];
  public editDescription: any = "";
  public editLooking: any = "";

  constructor(
    public firestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    public firestorage: AngularFireStorage
  ) {}

  login(data) {
    console.log(data);

    //first lets log anyone who might be logged in , out
    firebase.auth().signOut();

    //store users login info
    this.userAuthInfo = data;

    //firebase

    firebase
      .auth()
      .signInWithEmailAndPassword(this.userAuthInfo[0], this.userAuthInfo[1])
      .catch(error => {
        //handle errors
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          alert("the Password is too weak");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });

    //check and retrieve
    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.user = user;
        this.router.navigate(["/browse"]);
      }
    });
  }
  logout() {
    //  log anybody out who was previously logged in..
    firebase.auth().signOut();
    this.router.navigate(["/home"]);
  }

  registerUser(data) {
    //  first log anybody out who was previously logged in..
    firebase.auth().signOut();

    //take the data we recieved from register.ts and store it so we can use it.
    this.userAuthInfo = data;
    console.log(this.userAuthInfo[0], this.userAuthInfo[1]);

    //Convert email to a username
    this.username = this.userAuthInfo[0].slice(
      0,
      this.userAuthInfo[0].lastIndexOf("@")
    );

    //registerInFirebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.userAuthInfo[0],
        this.userAuthInfo[1]
      )
      .catch(error => {
        //handle errors
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          alert("the Password is too weak");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    //check for registered user

    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        console.log("REGISTERED SUCCESSFUL:", user);
        this.router.navigate(["/next"]);
        this.firestore
          .collection("ionTennisUsers")
          .doc(user.uid)
          .set({
            uid: user.uid,
            email: this.userAuthInfo[0],
            userName: this.username
          })
          .then(() => {
            console.log(
              "uid: " + user.uid + "was saved in the firestore, thanks"
            );
            alert(
              "uid: " +
                user.uid +
                ", And UserName: " +
                this.username +
                " was saved in the firestore, thanks 😎"
            );
          });
        user.providerData.forEach(function(profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          var newEmail = profile.email;
          console.log(newEmail);
          console.log("  Photo URL: " + profile.photoURL);
          //this.email = profile.email;
        });
      }
    });
  }

  async sendPhotoToStorage(data) {
    this.user = firebase.auth().currentUser;
    this.profileFile = data;
    console.log(this.profileFile);
    const path = this.user.uid + "/profilePicture/" + this.profileFile.name;

    //create firebase Storage ref with username
    this.storageRef = firebase
      .storage()
      .ref(this.user.uid + "/profilePicture/" + this.profileFile.name);
    //upload file to firebase storage
    this.sendFileTaskObject = this.storageRef.put(this.profileFile);

    //create new await promise  that will run the .then after a specificed time
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  }

  //nextStep in registration is to update their auth profile provider data with a downloaded url of the file they uploaded to storage ..

  updateProfilePhotoAfterAuth(data) {
    //get user
    this.user = firebase.auth().currentUser;
    this.newProfileFile = data;
    console.log(this.newProfileFile);

    console.log(this.profileFile.name);

    if (this.user) {
      const pic = firebase
        .storage()
        .ref(this.user.uid + "/profilePicture/" + this.newProfileFile.name)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          this.user.updateProfile({
            photoURL: url
          });
          alert("Lookin Good ;)");
          this.firestore
            .collection("ionTennisUsers")
            .doc(this.user.uid)
            .update({
              profilePic: url
            });
        });
    }
  }

  updateProfileDisplayName(data) {
    this.user = firebase.auth().currentUser;
    this.newDisplayName = data;
    console.log(this.newDisplayName);
    if (this.user) {
      this.user.updateProfile({
        displayName: this.newDisplayName
      });
    }
  }

  getFireStoreData() {
    this.firestore
      .collection("ionTennisUsers")
      .get()
      .subscribe(snap => {
        snap.forEach(allTheDocuments => {
          this.accountsArray.push(allTheDocuments.data());
        });
      });
  }

  getCreepDetails(data) {
    //clear any user that was last creeped on
    this.creepDetailsArray = [];
    //push new user tht we want to creep on into arr
    this.creepDetailsArray.push(data);

    console.log(this.creepDetailsArray);
    this.router.navigate(["/creep"]);
  }

  letsUpdateProfile(data) {
    this.user = firebase.auth().currentUser;
    this.editDisplayName = data;

    if (this.user) {
      this.user.updateProfile({
        displayName: this.editDisplayName
      });
    }
  }

  deleteProfile() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      //delete from firestore
      this.firestore
        .collection("ionTennisUsers")
        .doc(this.user.uid)
        .delete()
        .then(() => {
          console.log("Users Informations was deleted from the firestore.");
        })
        .catch(err => {
          console.log(err);
        });

      //delete from firebase.auth
      this.user
        .delete()
        .then(() => {
          //user deleted
          alert("You account has been deleted.");
        })
        .catch(err => {
          console.log(err);
          alert("there was a error deleting your acount, Sorry!");
        });
    }
  }
  getShotsDetails(data) {
    this.user = firebase.auth().currentUser;

    console.log(data);
    this.firestore
      .collection("ionTennisUsers")
      .doc(this.user.uid)
      .update({
        lookingToPlay: data[0],
        profileDescription: data[3]
      })
      .then(() => {
        alert("Cool, Weve got you saved.. Start Finding a partner Today!");
        this.router.navigate(["/browse"]);
      });
  }

  getUserFirestoreData() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.firestore
        .collection("ionTennisUsers")
        .doc(this.user.uid)
        .get()
        .subscribe(snap => {
          //console.log(snap.data());
          this.indivFireData = snap.data();
          console.log(this.indivFireData);
        });
    }
  }

  updataUserFirestoreInfo(dataDescription, dataLooking) {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.firestore
        .collection("ionTennisUsers")
        .doc(this.user.uid)
        .update({
          profileDescription: dataDescription,
          lookingToPlay: dataLooking
        });
    }
  }

  updateBrowseOnViewEnter() {
    this.accountsArray = [];
    this.getFireStoreData();
  }
}
