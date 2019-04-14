/* eslint-disable */

import companies from '@/services/companies';

export default {
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
                { value: 0, text: '11-50' },
                { value: 0, text: '51-200' },
                { value: 0, text: '2001-1000' }
            ],
            phone: '',
            password: '',
            passwordConfirm: ''
		};
	},
	methods: {
		signUp() {
            companies.register({
                data: {
                    name: this.name,
                    lastname: this.lastname,
                    email: this.email,
                    company_name: this.company_name,
                    type_id: 1,
                    size: this.size,
                    phone: this.phone,
                    password: this.password,
                    location: this.place.formatted_address
                }
            }).then(res => {
                if(res.response) {
                    this.$router.push({ name: 'login' });
                }
            });
        }
	}
};
