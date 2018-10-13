/* eslint-disable */
import Header from '@/app/components/header/Header.vue';
import companies from '@/services/companies';
import VTable from '@/app/components/VTable.vue';
import {gmapApi} from 'vue2-google-maps';

export default {
    components: {
        Header,VTable
    },

    computed: {
        // TODO Delete this code
        // currentFormattedDate() {
        //     return moment(this.currentDate).format('dddd, MMMM Do YYYY');
        // },
        google: gmapApi
    },

    watch: {
        companies: function(newValue, oldValue) {
            if (newValue.length !== oldValue) {
                newValue.forEach(company => {
                    if (company.location) {
                        console.log('success', company);
                        // this.getPosition(company.location);
                    }
                });
            }
        }
    },

    beforeMount() {
        companies.find({}).then(res => {
            let companiesArr = res;
            this.companies = res;
            console.log(res)
            companiesArr.forEach(company => {
                this.items.push({
                    'Nombre': company.company_name,
                    'Fecha de Registro': moment(company.created_at).format('LL')
                });
                // this.getPosition(company.location);
            });
        }).catch(err => {
            console.log('error al traer compañias', err)
        });
    },

    data() {
        return {
            companies: [],
            items: [],
            fields: [
                {key: 'Nombre', sortable: true},
                'Fecha de Registro'
            ],
            markers: []
        };
    },

    methods: {
        // FIXME Geocoder its not supported by vue module
        // TODO Verify if we can instantiate geocoder from maps (?)
        getPosition(location) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({"address": location}, results => {
                console.log(results)
                let latlng = results[0].geometry.location;
                this.markers.push({
                    lat: latlng.lat(),
                    lng: latlng.lng()
                });
            });
        }
    }
};
