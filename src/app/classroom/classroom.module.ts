import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClassroomComponent } from './list-classroom/list-classroom.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatOptionModule } from '@angular/material/core';
import {  MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ListClassroomComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule
    
  ],
  exports: [
    ListClassroomComponent
  ]
})
export class ClassroomModule { }
