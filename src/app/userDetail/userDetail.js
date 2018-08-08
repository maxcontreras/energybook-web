/* eslint-disable */
import eUsers from '@/services/eUsers';

export default {
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin;
        },
        isUser() {
            return this.$store.state.isUser;
        },
        isManager() {
            return this.$store.state.isManager;
        },
        isAccounting() {
            return this.$store.state.isAccounting;
        }
    }, 
    data() {
        return {
            edit: false,
            changePassword: false,
            editCompany: false,
            originalData: {},
            user: {
                company: {}
            },
            newPassword: {
                password: '',
                confirm: ''
            }
        }
    },

    beforeMount() {
        console.log(this.$route);
        let userId = eUsers.getCurrentId();
        eUsers.find({
            id: userId,
            filter: {
                include: ['company']
            }
        }).then(user => {
            this.user = user;
            this.user.created_at = moment(this.user.created_at).format('LL');
            this.user.lastLogin = moment(this.user.lastLogin).format('LL');
            this.user.fullname = `${this.user.name} ${this.user.lastname}`;
            this.originalData = JSON.parse(JSON.stringify(this.user));
        });
    },

    methods: {
        cancel() {
            this.edit = false;
            this.changePassword = false;
            this.editCompany = false;
            this.user = JSON.parse(JSON.stringify(this.originalData));
            this.newPassword = { password: '', confirm: '' };
        },
        saveChanges() {
            function userUpdate() {

            }

            function passwordUpdate() {

            }

            function companyUpdate() {

            }

            if(this.edit) {
                userUpdate();
            } else if(this.changePassword) {
                passwordUpdate();
            } else {
                companyUpdate();
            }
        }
    }
}