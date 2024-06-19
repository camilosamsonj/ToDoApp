/**
 * TaskDialogComponent
 * 
 * Componente de diálogo para crear o editar una tarea.
 * Utiliza formularios reactivos para manejar el formulario y sus validaciones.
 * 
 * Métodos:
 * - constructor(): Configura el formulario y carga los datos si se está editando una tarea.
 * - ngOnInit(): Carga las prioridades disponibles para el formulario.
 * - nombreControl, fechaControl, prioridadControl: Métodos para acceder a los campos del formulario.
 * - onSave(): Maneja la acción de guardar, valida el formulario y envía los datos de la tarea.
 */


import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ITask, IPriority, ITaskToSend } from '../../models'; // Assuming ITask is defined in your models folder
import { holidayValidator } from 'src/app/validators/holiday-validator';
import { PublicHolidayService } from 'src/app/core/services/public-holiday.service';
import { PriorityService } from 'src/app/core/services/priority.service';

@Component({
  selector: 'app-task-dialog-component',
  templateUrl: './task-dialog-component.html',
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  priorities$: Observable<IPriority[]> = of([]);

  constructor(

    private publicHolidayService: PublicHolidayService,
    private priorityService: PriorityService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public editingTask?: ITask
  ) {
    this.taskForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      fecha: ['', [Validators.required],
        [holidayValidator(publicHolidayService)], { updateOn: 'blur' }
      ],
      prioridad: ['', [Validators.required]],
    });

    if (editingTask) {
      this.taskForm.patchValue(editingTask);
    }
  }

  ngOnInit(): void {
    this.priorities$ = this.priorityService.getPriorities();

  }

  get nombreControl() {
    return this.taskForm.get('nombre');
  }

  get fechaControl() {
    return this.taskForm.get('fecha');
  }

  get prioridadControl() {
    return this.taskForm.get('prioridad');
  }


  onSave(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
    } else {
      const formData = this.taskForm.value;

      const taskToSend: ITaskToSend = {
        nombre: formData.nombre,
        fecha: formData.fecha,
        prioridadID: formData.prioridad
      };
      this.matDialogRef.close(taskToSend);
    }
  }
}