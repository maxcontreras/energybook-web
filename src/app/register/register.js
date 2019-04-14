/* eslint-disable */

import companies from '@/services/companies';
import notify from '@/mixins/notify';

export default {

    mixins: [notify('register')],

	data() {
		return {
            name: '',
            lastname: '',
            email: '',
            company_name: '',
            business_line_selected: null,
            business_lines: [
                { value: null, text: 'Giro de tu empresa' },
                { value: 0, text: 'Manufactura' },
                { value: 1, text: 'Automotriz' },
                { value: 2, text: 'Textil'},
                { value: 3, text: 'Metalurgica' },
                { value: 4, text: 'Sidelurgica' },
                { value: 5, text: 'Minera' },
                { value: 6, text: 'Petroquímica' },
                { value: 7, text: 'Eléctrica' },
                { value: 8, text: 'Otro' }
            ],
            state_selected: null,
            states: [
                { value: null, text: 'Estado' },
                { value: 0, text: 'Aguascalientes' },
                { value: 1, text: 'Baja California' },
                { value: 2, text: 'Baja California Sur' },
                { value: 3, text: 'Campeche' },
                { value: 4, text: 'Chihuahua' },
                { value: 5, text: 'Chiapas' },
                { value: 6, text: 'Coahuila' },
                { value: 7, text: 'Colima' },
                { value: 8, text: 'Durango' },
                { value: 9, text: 'Guanajuato' },
                { value: 10, text: 'Guerrero' },
                { value: 11, text: 'Hidalgo' },
                { value: 12, text: 'Jalisco' },
                { value: 13, text: 'México' },
                { value: 14, text: 'Michoacán' },
                { value: 15, text: 'Morelos' },
                { value: 16, text: 'Nayarit' },
                { value: 17, text: 'Nuevo León' },
                { value: 18, text: 'Oaxaca' },
                { value: 19, text: 'Puebla' },
                { value: 20, text: 'Querétaro' },
                { value: 21, text: 'Quintana Roo' },
                { value: 22, text: 'San Luis Potosí' },
                { value: 23, text: 'Sinaloa' },
                { value: 24, text: 'Sonora' },
                { value: 25, text: 'Tabasco' },
                { value: 26, text: 'Tamaulipas' },
                { value: 27, text: 'Tlaxcala' },
                { value: 28, text: 'Veracruz' },
                { value: 29, text: 'Yucatán' },
                { value: 30, text: 'Zacatecas' }
            ],
            size_selected: null,
            sizes: [
                { value: null, text: '¿Cuánta gente trabaja en tu empresa?' },
                { value: 0, text: '2-10' },
                { value: 1, text: '11-50' },
                { value: 2, text: '51-200' },
                { value: 3, text: '2001-1000' }
            ],
            phone: '',
            password: '',
            passwordConfirm: ''
		};
    },
    
	methods: {
        validateData() {
            const phoneRegexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            const mailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            const dropDownsSelected = this.size_selected !== null && this.state_selected !== null && this.business_line_selected !== null;
            const nonEmptyValues = this.name.replace(/ /g, '') !== '' && this.phone.replace(/ /g, '') !== '' &&
                this.password.replace(/ /g, '') !== '' && this.passwordConfirm.replace(/ /g, '') !== '' &&
                this.lastname.replace(/ /g, '') !== '' && this.company_name.replace(/ /g, '') !== '' && this.email.replace(/ /g, '') !== '';
            if (!dropDownsSelected || !nonEmptyValues) {
                return { valid: false, message: 'Falta llenar algunos campos' };
            }
            if (!phoneRegexp.test(this.phone)) {
                return { valid: false, message: 'El número de teléfono no tiene un formato válido' };
            }
            if (!mailRegexp.test(this.email)) {
                return { valid: false, message: 'Correo electrónico no tiene formato válido' };
            }
            if (this.password !== this.passwordConfirm) {
                return { valid: false, message: 'La contraseña debe ser la misma' };
            }
            return { valid: true, message: '' };
        },

        resetValues() {
            this.name = '';
            this.lastname = ''
            this.email = '';
            this.company_name = '';
            this.business_line_selected = null;
            this.state_selected = null;
            this.size_selected = null;
            this.phone = '';
            this.password = '';
            this.passwordConfirm = '';
        },

		signUp() {
            const { valid, message } = this.validateData();

            if (valid) {
                const contactData = {
                    full_name: `${this.name} ${this.lastname}`,
                    company_name: this.company_name,
                    business_line: this.business_lines.find(line => line.value === this.business_line_selected).text,
                    state: this.states.find(state => state.value === this.state_selected).text,
                    size: this.sizes.find(size => size.value === this.size_selected).text,
                    phone: this.phone
                };
                const newUser = {
                    name: this.name,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                    phone: this.phone
                };
                companies.register(contactData, newUser)
                    .then(() => {
                        this.notify('Éxito', 'Usuario de prueba creado exitosamente. Inicia sesión para comenzar', 'success');
                        this.resetValues();
                    }) 
                    .catch(() => {
                        this.notify('Error', 'No fue posible crear una cuenta de prueba. Contacta a un administrador', 'error');
                    });
            } else {
                this.notify('Error', message, 'warn');
            }
        }
	}
};
