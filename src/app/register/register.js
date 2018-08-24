/* eslint-disable */

import companies from '@/services/companies';

export default {
	data() {
		return {
            name: '',
            lastname: '',
            email: '',
            company_name: '',
            businessLine: '',
            size: '',
            phone: '',
            password: '',
            passwordConfirm: '',
            place: ''
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
        },
        setPlace(place) {
            this.place = place;
            console.log(this.place);
        }
	}
};
