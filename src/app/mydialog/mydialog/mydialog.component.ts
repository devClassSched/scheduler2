import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mydialog',
  templateUrl: './mydialog.component.html',
  styleUrls: ['./mydialog.component.scss']
})
export class MydialogComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data); 
  }

  ngOnInit() {}

  
}