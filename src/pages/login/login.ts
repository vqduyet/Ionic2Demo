import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { ContentPage } from '../content/content';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  loading: Loading;
  loginCredentials = {email: '', password: ''};
  
  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  public createAccount(){
    this.navCtrl.push(RegisterPage);
  }

  public login(){
    this.showLoading();
    this.auth.login(this.loginCredentials).subscribe(allowed => {
      if(allowed) {
        setTimeout(() => {
          this.loading.dismiss();
          this.navCtrl.setRoot(ContentPage);
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text){
    setTimeout(() => {
      this.loading.dismiss();
    });
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
