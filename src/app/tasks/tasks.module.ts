import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TaskDialogComponent } from './components/task-dialog-component/task-dialog-component.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';




@NgModule({
  declarations: [
    TasksComponent,
    TaskDialogComponent,


  ],
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule,
    MatDatepickerModule,
  ]
})
export class TasksModule { }
