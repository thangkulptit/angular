import { Injectable } from '@angular/core';
import { MatConfirmDialogComponent } from '../components/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog (title: string, content: string) {
  return this.dialog.open(MatConfirmDialogComponent, {
      width: '300px',
      panelClass: 'content-dialog',
      disableClose: true,
      data: {
        title: title,
        content: content,
      }
    });
  }
}
