import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PublicHolidayService } from "../core/services/public-holiday.service";

export function holidayValidator(publicHolidayService: PublicHolidayService): ValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        if (!control.value) {
            return null; // Si el control está vacío, no hay error de validación
        }

        const date = new Date(control.value);

        // Verificar si la fecha es válida
        if (isNaN(date.getTime())) {
            return { holiday: 'Fecha no válida' };
        }

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        try {
            const response = await publicHolidayService.GetHoliday(year, month, day).toPromise(); // Esperar la respuesta del servicio

            // Verificar si la respuesta contiene un feriado
            if (response && response.length > 0) {
                const holiday = response[0]; // Se asume que solo se devuelve un feriado
                return { holiday: `El día ${holiday.fecha} es un feriado: ${holiday.nombre}` };
            }

            return null; // Si no hay feriado, no hay error de validación
        } catch (error) {
            console.error('Error while validating holiday', error);
            return { holiday: 'Error en la validación del día festivo' }; // Manejar el error de forma adecuada
        }
    };
}