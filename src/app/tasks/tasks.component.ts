import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, of, throwError } from 'rxjs';
import { IPriority, ITask } from './models';
import { TaskDialogComponent } from './components/task-dialog-component/task-dialog-component.component';
import { TasksService } from './tasks.service';
import { PriorityService} from '../core/services/priority.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  tasks$: Observable<ITask[]> = of([]);

  dataSource = new MatTableDataSource<ITask>();

  displayedColumns: string[] = [
    'id',
    'date',
    'name',
    'priority',
    'actions',
  ]


  constructor(
    private priorityservice: PriorityService,
    private tasksService: TasksService,
    private matDialog: MatDialog
  ){}
 
  getTasks(): void {
    this.tasksService.getTasks().subscribe(data => {
      this.dataSource.data = data;
    })
  }
 
  openDialog(editingTask?: ITask): void {
  this.matDialog.open(TaskDialogComponent, { data: editingTask })
    .afterClosed().subscribe({
      next: (result) => {
        if (result) {
          if (!editingTask ) {
              this.tasksService.createTask(result).subscribe();                      
          } else {
            if(editingTask.id)
                {
                  this.tasksService.editTask(editingTask.id, result).subscribe();
                }
          }
        }
      },
      error: (error: any) => {
        console.error('Error en el diálogo:', error);
      }
    });
  }

  deleteTask(id: number): void {
    this.tasksService.deleteTask(id).subscribe();
  }


  ngOnInit(): void {
    this.getTasks();
  }

}
