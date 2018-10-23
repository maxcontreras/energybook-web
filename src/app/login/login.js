/* eslint-disable */
export default {
	data() {
		return {
			email: 'admin@ecgenergia.com',
			password: 'Password123'
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
