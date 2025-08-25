import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AppComponent } from '../../app.component';
import { HomeComponent } from '../sidebar/home.component';

@Component({
  selector: 'app-features',
  imports: [HomeComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {

}
