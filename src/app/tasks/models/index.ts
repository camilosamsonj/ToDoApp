export interface ITask {
    id?: number;
    nombre: string;
    fecha: Date;
    prioridadID: number;
    prioridad: IPriority
  }

export interface Holiday {
    nombre: string;
    comentarios: string | null;
    fecha: string;
    irrenunciable: string;
    tipo: string;
  }

export interface IPriority {
    id: number,
    nombre: string,
}

export interface ITaskToSend {
  nombre: string;
  fecha: Date;
  prioridadID: number; 
}