/* eslint-disable */
import eUsers from '@/services/eUsers'
import companies from '@/services/companies'
import VTable from '@/app/components/VTable.vue'
import {gmapApi} from 'vue2-google-maps'
import Constants from '@/constants'

const meterActive = Constants.Meters.active

export default {
    components: {
        VTable
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
        google: gmapApi
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
            isCompanyProfile: this.$route.name === 'companyProfile',
            items: { users: [], meters: [] },
            fields: {
                users: [{
                    key: 'Nombre',
                    sortable: true
                }, {
                    key: 'Fecha de Registro',
                    sortable: true
                }, 'Email', 'Rol'],
                meters: [{
                    key: 'No. de Serie',
                    sortable: true,
                    label: 'No. de Serie'
                }, 'Fecha de Registro', 'Estado']
            },
            companyPosition: {lat:20.663782, lng:-103.3916394}
        }
    },

    beforeMount() {
        if(this.$route.name === 'profile') {
            let userId = eUsers.getCurrentId()
            eUsers.find({
                id: userId,
                filter: {
                    include: ['company']
                }
            }).then(user => {
                this.user = user
                this.setUserValues(this.user)
                this.getPosition()
            })
        } else if(this.$route.name === 'companyProfile') {
            let id = this.companyId
            companies.find({
                id,
                filter: {
                    include: ['meters', 'users']
                }
            }).then(company => {
                this.user.company = company
                this.user.created_at = company.created_at
                this.setUserValues(this.user)
                this.mapCompanyUsers()
                this.getPosition()
            })
        }
    },

    methods: {
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
        setUserValues(object) {
                object.created_at = moment(object.created_at).format('LL')
                object.lastLogin = moment(object.lastLogin).format('LL')
                object.fullname = `${object.name} ${object.lastname}`
                this.originalData = JSON.parse(JSON.stringify(object))
        },
        mapCompanyUsers() {
            this.user.company.users.forEach(user => {
                this.items.users.push({
                    'Nombre':`${user.name} ${user.lastname}`,
                    'Fecha de Registro': moment(user.created_at).format('LL'),
                    'Email':user.email,
                    'Rol':user.role_id
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
            var geocoder = new google.maps.Geocoder()
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
        }
    }
}
