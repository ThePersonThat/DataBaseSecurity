import {Component} from '@angular/core';
import {DataService} from "./shared/services/data.service";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, AuthService]
})
export class AppComponent {
}
