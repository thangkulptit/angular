import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { ProgressLoadingRouteService } from './services/progress-loading-route.service';
import { AlertService } from './services/alert.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private _router: Router,
    private progressLoadingService: ProgressLoadingRouteService,
    ) {
    this._router.events.subscribe((routerEvent: Event) => {
      if(routerEvent instanceof NavigationStart) {
        this.progressLoadingService.show();
      }

      if(routerEvent instanceof NavigationEnd) {
        this.progressLoadingService.hide();
        // setTimeout(() => {
        //   this.progressLoadingService.hide();
        // }, 500);
      }
    })
  }
  
}
