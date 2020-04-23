import { Component } from '@angular/core';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public otherTheme: boolean

  constructor(private sessionService: SessionService) {
    this.sessionService.theme.subscribe((rsp) => this.otherTheme = rsp)
  }
}
