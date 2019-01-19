/* eslint-disable */
export default {
	data() {
		return {
			email: '',
			password: ''
		};
	},
	methods: {
		login() {
			this.$store.dispatch('user/login', {
				email: this.email,
				password: this.password,
			});
		},
		openRegister() {
			this.$router.push({name: 'register'})
		}
	}
};
