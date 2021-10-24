import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MydialogComponent } from './mydialog/mydialog.component';



@NgModule({
  declarations: [
    MydialogComponent
  ],
  imports: [
    CommonModule,
    MatSnackBar
  ]
})
export class MydialogModule { }
