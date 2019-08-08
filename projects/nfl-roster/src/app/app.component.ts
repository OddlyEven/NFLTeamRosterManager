import { Component } from '@angular/core';

@Component({
  selector: 'nfl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  onReload(): void {
    location.reload();
  }
}
