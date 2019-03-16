/* eslint-disable */
import eUsers from '@/services/eUsers'
import companies from '@/services/companies'
import VTable from '@/app/components/VTable.vue'
import {gmapApi} from 'vue2-google-maps'
import Constants from '@/constants'
import ConfirmationDialog from '@/app/components/ConfirmationDialog.vue';

const meterActive = Constants.Meters.active

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

export default {
    components: {
        VTable,
        ConfirmationDialog
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
            },
            items: { users: [], meters: [] },
            fields: {
                users: [
                    {key: 'Nombre', sortable: true},
                    {key: 'Fecha de Registro', sortable: true},
                    {key: 'Email', label: 'Correo'},
                    'Rol',
                    {key: 'Reset', label: 'Contraseña'},
                    {key: 'Delete', label: 'Eliminar usuario'}
                ],
                meters: [
                    {key: 'No. de Serie', sortable: true, label: 'No. de Serie'},
                    'Fecha de Registro',
                    'Estado'
                ]
            },
            companyPosition: {lat:20.663782, lng:-103.3916394},
            showCreateUserModal: false,
            showPasswordResetModal: false,
            newUser: {
                name: '',
                lastname: '',
                email: '',
                password: ''
            },
            selectedUser: ''
        }
    },

    computed: {
        isAdmin() {
            return this.$store.state.isAdmin
        },

        isUser() {
            return this.$store.state.isUser
        },

        isManager() {
            return this.$store.state.isManager
        },

        isAccounting() {
            return this.$store.state.isAccounting
        },

        companyId() {
            return this.$store.state.currentCompanyDetailId
        },

        isCompanyProfile: function() {
            return this.$route.name === 'companyProfile'
        },

        userFullname: function() {
            return this.user.name + ' ' + this.user.lastname;
        },

        userCreatedAt: function() {
            return moment(this.user.created_at).format('LL');
        },

        userLastLogin: function() {
            return moment(this.user.lastLogin).format('LL');
        },

        google: gmapApi,

        marker: function() {
            if (this.google) {
                return {
                    size: new this.google.maps.Size(40,80),
                    scaledSize: new this.google.maps.Size(40,80),
                    url: '/assets/images/marker.svg'
                }
            }
            return {}
        }
    },

    beforeMount() {
        if(this.$route.name === 'profile') {
            this.getUser();
        } else if(this.$route.name === 'companyProfile') {
            this.getCompany();
        }
    },

    methods: {
        getUser() {
            let userId = eUsers.getCurrentId()
            eUsers.find({
                id: userId,
                filter: {include: ['company']}
            })
            .then(user => {
                this.user = user;
                this.user.company = user.company;
                this.originalData = JSON.parse(JSON.stringify(user));
                this.companyPosition = {lat: this.user.company.location.lat, lng: this.user.company.location.lon };
                //this.getPosition()
            })
            .catch(err => {
                console.error(err);
            });
        },

        getCompany() {
            let id = this.companyId
            companies.find({id,filter: {include: ['meters', 'users']}})
            .then(company => {
                this.user.company = company
                this.user.created_at = company.created_at
                this.originalData = JSON.parse(JSON.stringify(company));
                this.mapCompanyUsers()
                this.companyPosition = {lat: this.user.company.location.lat, lng: this.user.company.location.lon };
                //this.getPosition()
            })
            .catch(err => {
                console.error(err);
            })
        },

        cancel() {
            this.edit = false
            this.changePassword = false
            this.editCompany = false
            this.user = JSON.parse(JSON.stringify(this.originalData))
            this.newPassword = { password: '', confirm: '' }
        },

        saveChanges() {
            function userUpdate() {

            }

            function passwordUpdate() {

            }

            function companyUpdate() {

            }

            if(this.edit) {
                userUpdate()
            } else if(this.changePassword) {
                passwordUpdate()
            } else {
                companyUpdate()
            }
        },

        mapCompanyUsers() {
            this.user.company.users.forEach(user => {
                this.items.users.push({
                    'Nombre': `${user.name} ${user.lastname}`,
                    'Fecha de Registro': moment(user.created_at).format('LL'),
                    'Email': user.email,
                    'Rol': user.role_id,
                    'id': user.id
                })
            })
        },

        mapCompanyMeters() {
            this.user.company.meters.forEach(meter => {
                this.items.meters.push({
                    'No. de Serie': meter.serial_number,
                    'Fecha de Registro': moment(meter.created_at).format('LL'),
                    'Estado': meterActive[meter.active]
                })
            })
        },

        getPosition() {
            var geocoder = new this.google.maps.Geocoder()
            geocoder.geocode({
                "address": this.user.company.location
            }, results => {
                let latlng = results[0].geometry.location
                this.companyPosition = {
                    lat: latlng.lat(),
                    lng: latlng.lng()
                }
            })
        },

        setPlace(place) {
            this.user.company.location = place.formatted_address
        },

        resetUserPassowrd(item) {
            // TODO Send request to reset user password
            console.log(item);
        },

        showUserModal() {
            this.newUser = {
                name: '',
                lastname: '',
                email: '',
                password: ''
            }
            this.showCreateUserModal = true;
        },

        hideUserModal() {
            this.showCreateUserModal = false;
        },

        validateUser() {
            if (!this.newUser.name || !this.newUser.lastname || !this.newUser.email || !this.newUser.password) return false;
            return validateEmail(this.newUser.email);
        },

        addNewUser() {
            if (!this.validateUser()) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    text: 'Revisa que los campos estén escritos corréctamente'
                });
                return;
            }
            companies.addUser(this.companyId, this.newUser)
                .then(({user}) => {
                    this.items.users.push({
                        'Nombre': `${user.name} ${user.lastname}`,
                        'Fecha de Registro': moment(user.created_at).format('LL'),
                        'Email': user.email,
                        'Rol': user.role_id,
                        'id': user.id
                    });
                    this.$notify({
                        group: 'notification',
                        type: 'success',
                        text: 'Usuario creado con éxito'
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.$notify({
                        group: 'notification',
                        type: 'error',
                        text: 'Error al crear usuario'
                    });
                })
                .finally(() => {
                    this.hideUserModal();
                });
        },

        deleteUser(user) {
            eUsers.delete(user.id)
                .then(() => {
                    this.items.users = this.items.users.filter(usr => usr.id !== user.id);
                    this.$notify({
                        group: 'notification',
                        type: 'success',
                        text: 'Usuario eliminado exitósamente'
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.$notify({
                        group: 'notification',
                        type: 'error',
                        text: 'Error al borrar usuario'
                    });
                })
        },

        showPasswordReset(user) {
            this.selectedUser = user;
            this.showPasswordResetModal = true;
        },

        resetPassword() {
            this.showPasswordResetModal = false;
            eUsers.resetPassword(this.selectedUser.id)
                .then(() => {
                    this.$notify({
                        group: 'notification',
                        type: 'success',
                        text: 'Password reseteado con éxito'
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.$notify({
                        group: 'notification',
                        type: 'error',
                        text: 'Error al resetear contraseña'
                    });
                });
        }
    }
}
