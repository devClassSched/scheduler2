import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MydialogComponent } from '../mydialog/mydialog/mydialog.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private snackBar: MatSnackBar) {}
  public openSnackBar(message: string ) {
   
    this.snackBar.openFromComponent(MydialogComponent, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: { message: message }
    });
  }
}
