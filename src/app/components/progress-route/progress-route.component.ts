import { Component, OnInit } from '@angular/core';
import { ProgressLoadingRouteService } from '../../services/progress-loading-route.service';

@Component({
  selector: 'app-progress-route',
  templateUrl: './progress-route.component.html',
  styleUrls: ['./progress-route.component.css']
})
export class ProgressRouteComponent implements OnInit {

  constructor(public progressLoadingRouteService: ProgressLoadingRouteService) { }

  ngOnInit() {
  }

}
