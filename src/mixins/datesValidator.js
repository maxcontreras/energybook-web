/* eslint-disable */
export default {
    methods: {
        validateDates(from, until, dayDifference) {
            let isValid = false;
            let errorMessage = {};
            if (moment(until).isBefore(from)) {
                errorMessage = { title: 'Fecha incorrecta', text: 'La fecha de inicio no puede ser mayor a la final' };
            } else if (dayDifference > 31) {
                errorMessage = { title: 'Periodo muy grande', text: 'El periodo no puede exceder más de 31 días' };
            } else if (moment().isBefore(from)){
                errorMessage = { title: 'Periodo inexistente', text: 'La fecha de inicio no puede ser mayor a la actual' };
            } else {
                isValid = true;
            }
            return {isValid, errorMessage};
        },
    }
}