import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {name: '', email: '', password: ''};

  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController) {}

  public register(){
    this.auth.register(this.registerCredentials).subscribe(success =>{
      if(success){
        this.createSuccess = true;
        this.showPopup("Success", "Account Created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
    error =>{
      this.showPopup("Error", error);
    });
  }

  showPopup(title, text){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [{
        text: 'OK',
        handler: data => {
          if(this.createSuccess){
            this.navCtrl.popToRoot();
          }
        }
      }]
    });
    alert.present();
  }
}
