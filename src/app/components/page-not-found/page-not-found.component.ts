import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorParams } from '../../interface/error-params-interface';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  error: ErrorParams;
  constructor(private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.getParamsFromUrl();
  }

  private getParamsFromUrl(): void {
    this.activeRouter.queryParams.subscribe((data: ErrorParams) => {
      this.error = data;
    }) //lay params tren trinh duyet
  }
}

