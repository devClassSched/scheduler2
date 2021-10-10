import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ) { }  
  msg: String = "";
  action: String = "";
  type: String ="";

  ngOnInit() {
    // will log the entire data object
    this.msg = this.data.msg;
    this.type = this.data.type;
    this.action = this.data.action;
  }
}



