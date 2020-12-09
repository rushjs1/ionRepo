import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import firebase from "firebase/app";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: "root"
})
export class ModelService {
  public email: any = "";
  public password: any = "";
  public userAuthInfo: any = [];
  public user: any = [];
  public accountsArray: any = [];
  public username: any = "";
  public blogsArray: any = [];
  public postAndUser: any = [];
  public posts: any = [];
  public postDetailsArray: any = [];

  constructor(
    public firestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    public firestorage: AngularFireStorage
  ) {}

  enterTheSite() {
    this.router.navigate(["/login"]);
    console.log("welcome users");
  }
  logOut() {
    this.user = firebase.auth().signOut();

    this.router.navigate(["/home"]);
    console.log(this.user);
  }
  login(data) {
    this.userAuthInfo = data;

    console.log(this.userAuthInfo);

    console.log("worked");
    firebase
      .auth()
      .signInWithEmailAndPassword(this.userAuthInfo[0], this.userAuthInfo[1])
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.router.navigate(["/browse"]);
        console.log(user);
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
        // this.email = user.providerData[0].email;
      }
    });
  }

  registerUser(data) {
    this.userAuthInfo = data;
    this.username = this.userAuthInfo[0].slice(
      0,
      this.userAuthInfo[0].lastIndexOf("@")
    );
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.userAuthInfo[0],
        this.userAuthInfo[1]
      )
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    //check for registered user
    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.firestore
          .collection("ionGeoUsers")
          .doc(user.uid)
          .set({
            uid: user.uid,
            email: this.userAuthInfo[0],
            UserName: this.username
          })
          .then(() => {
            console.log("uid: " + user.uid + "was saved in the firestore");
          });

        this.router.navigate(["/browse"]);
        console.log(user);
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
        // this.email = user.providerData[0].email;
      }
    });
  }

  navCreateBlog() {
    /*  this.user = firebase.auth().currentUser;
    console.log(this.user); */
    this.router.navigate(["/create-blog"]);
  }
  navToBrowse() {
    this.router.navigate(["/browse"]);
  }

  createBlogInFireStore(data) {
    this.user = firebase.auth().currentUser;
    console.log(data);
    if (this.user) {
      console.log(this.user);
      this.firestore
        .collection("ionGeoUsers", ref => ref.where("uid", "==", this.user.uid))
        .get()
        .subscribe(snap => {
          if (snap) {
            snap.forEach(indivDoc => {
              this.firestore
                .collection("ionGeoUsers")
                .doc(indivDoc.id)
                .collection("blogs")
                .doc(indivDoc.id)
                .set({
                  blogName: data[0],
                  blogContent: data[1],
                  blogId: indivDoc.id
                });
            });

            this.router.navigate(["/browse"]);
            this.refreshFirestoreData();
            alert("thanks. Your Blog was Posted. 😎");
          } else {
            console.log("error uploading Blog");
          }
        });
    }
  }

  getFirestoreData() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.firestore
        .collection("ionGeoUsers")
        .get()
        .subscribe(snap => {
          snap.forEach(document => {
            this.accountsArray.push(document.data());
          });
        });
      this.firestore
        .collection("ionGeoUsers")
        .get()
        .subscribe(snap => {
          snap.forEach(doc => {
            this.firestore
              .collection("ionGeoUsers")
              .doc(doc.id)
              .collection("blogs", ref => ref.where("blogId", "==", doc.id))
              .get()
              .subscribe(snap => {
                snap.forEach(cont => {
                  this.posts.push(cont.data());

                  console.log(this.posts);
                });
              });
          });
        });
    }
  }

  getPostDetails(data) {
    console.log(data);
    this.postDetailsArray = [];
    this.postDetailsArray.push(data);
  }

  getDesiredUpdate(data) {
    this.user = firebase.auth().currentUser;

    console.log(data);
    const blogInfo = data[0];
    console.log(blogInfo.blogId);

    this.firestore
      .collection("ionGeoUsers")
      .doc(blogInfo.blogId)
      .collection("blogs")
      .doc(blogInfo.blogId)
      .update({
        blogContent: data[1],
        blogName: data[2]
      })
      .then(() => {
        console.log(
          "I think the info Updated. Use If statement before to check if that id is equal to the id of the current signed in user to prevent. maybe only show if user ahh na thats hard"
        );
        this.refreshFirestoreData();
      });
  }

  refreshFirestoreData() {
    this.posts = [];
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.firestore
        .collection("ionGeoUsers")
        .get()
        .subscribe(snap => {
          snap.forEach(document => {
            this.accountsArray.push(document.data());
          });
        });
      this.firestore
        .collection("ionGeoUsers")
        .get()
        .subscribe(snap => {
          snap.forEach(doc => {
            this.firestore
              .collection("ionGeoUsers")
              .doc(doc.id)
              .collection("blogs", ref => ref.where("blogId", "==", doc.id))
              .get()
              .subscribe(snap => {
                snap.forEach(cont => {
                  this.posts.push(cont.data());

                  console.log(this.posts);
                });
              });
          });
        });
    }
  }

  deleteThePost(data) {
    console.log(data);

    this.user = firebase.auth().currentUser;

    console.log(data);
    const blogInfo = data;
    console.log(blogInfo.blogId);

    this.firestore
      .collection("ionGeoUsers")
      .doc(blogInfo.blogId)
      .collection("blogs")
      .doc(blogInfo.blogId)
      .delete()
      .then(() => {
        alert(
          "I think the info Deleted.. Have a good day. Make sure to hit the refresh button!"
        );
        this.router.navigate(["/browse"]);
        this.refreshFirestoreData();
      });
  }
}
