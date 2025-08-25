import { Component } from '@angular/core';
import { HomeComponent } from '../components/sidebar/home.component';

@Component({
  selector: 'app-medications',
  imports: [HomeComponent],
  templateUrl: './medications.component.html',
  styleUrl: './medications.component.css'
})
export class MedicationsComponent {

}
