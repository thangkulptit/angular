import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { TypeAlert } from '../../interface/alert-interface';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
@Input() inputAlert;

  Success = TypeAlert.Success;

  constructor(
    public alertService: AlertService
    ) { }

  ngOnInit() {
    
  }

  
}
