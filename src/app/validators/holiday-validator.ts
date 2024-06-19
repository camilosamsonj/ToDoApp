/**
 * 
 * Valida si una fecha es un día festivo utilizando el servicio de días festivos.
 * 
 * - Comprueba si la fecha es válida.
 * - Consulta el servicio para ver si la fecha es un día festivo.
 * - Devuelve un mensaje de error si la fecha es un día festivo o si hay un error en la validación.
 */




import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PublicHolidayService } from "../core/services/public-holiday.service";

export function holidayValidator(publicHolidayService: PublicHolidayService): ValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        if (!control.value) {
            return null; 
        }

        const date = new Date(control.value);

        if (isNaN(date.getTime())) {
            return { holiday: 'Fecha no válida' };
        }

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        try {
            const response = await publicHolidayService.GetHoliday(year, month, day).toPromise(); 
           
            if (response && response.length > 0) {
                const holiday = response[0]; 
                return { holiday: `El día ${holiday.fecha} es un feriado: ${holiday.nombre}` };
            }

            return null; 
        } catch (error) {
            console.error('Error while validating holiday', error);
            return { holiday: 'Error en la validación del día festivo' }; 
        }
    };
}