import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, Nav, MenuController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';

/*
  Generated class for the Content page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {
  @ViewChild(Nav) nav: Nav;

  //make homepage is the default content page
  rootPage: any = HomePage;
  pages: Array<{title:string, icon:string, component:any}>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menu: MenuController,
              private auth: AuthService) {
    //set pages
    this.pages = [
      {title: 'Home', icon:'home', component: HomePage},
      {title: 'About', icon:'information-circle', component: AboutPage}
    ];
  }

  public logout(){
    this.auth.logout().subscribe(
      succ => {
        this.navCtrl.setRoot(LoginPage);
      }
    );
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}
