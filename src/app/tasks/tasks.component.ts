/**
 * 
 * Este componente está encargado de mostrar, crear, editar y eliminar tareas.
 * Utiliza Angular Material para la visualización en una tabla y diálogos modales para las interacciones.
 * Se utiliza el BehaviorSubject de RxJs para proveer de datos a la tabla y actualizar una vez se realiza 
 * la acción.
 */

  /**
 * OpenDialog() se encarga de abrir el componente TaskDialogComponent y realizar acciones
 * con los datos que el componente le provee, dependiendo de si la acción que se está realizando es agregar o   editar una tarea
 * 
 */



import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from './models';
import { TaskDialogComponent } from './components/task-dialog-component/task-dialog-component.component';
import { TasksService } from './tasks.service';
import { PriorityService} from '../core/services/priority.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {


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
    this.tasksService.tasks$.subscribe(tasks => {
      this.dataSource.data = tasks;
    })
  }

}
