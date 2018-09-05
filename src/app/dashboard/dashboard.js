/* eslint-disable */

import router from '@/router.js';
import meters from '@/services/meters';
import designatedMeters from '@/services/designatedMeters';
import Table from '@/app/components/table/Table.vue';
import Header from '@/app/components/header/Header.vue';
import {gmapApi} from 'vue2-google-maps'
import Weather from 'vue-weather-widget';
import 'vue-weather-widget/dist/css/vue-weather-widget.css';

var position = {lat:'20.663782', lng:'-103.3916394'}

export default {
    components: {
        Table, Weather, Header
    },
    computed: {
        currentFormattedDate() {
            return moment(this.currentDate).format('dddd, MMMM Do YYYY');
        },
        filters() {
            return this.isAdmin? [this.companiesVal]:[];
        },
        position() {
            return position;
        },
        google: gmapApi
    },
    beforeMount() {
        console.log("hola");
        /*navigator.geolocation.getCurrentPosition(function(location) {
            position.lat = location.coords.latitude+'';
            position.lng = location.coords.longitude+'';
        });*/
        
        this.getMeters();
    },
    beforeRouteEnter (to, from, next) {
        if(JSON.parse(localStorage.getItem('user')).role_id === 1) {
            router.push({name: 'dashboardAdmin'});
        }
    },
    data() {
        return {
            metersFilter: [{
                selected: null,
                options: [ { value: null, text: 'Selecciona un dispositivo'} ]
            }],
            meters: [],
            meterId: '',
            dpVal: 0,
            epimpVal: 0,
            bcItems: [{
                text: 'Dashboard',
                to: { name: 'dashboard' }
            }, {
                text: '',
                active: true
            }],
            meterId: this.$route.params.id,
            companyId: JSON.parse(localStorage.getItem('user')).company_id
        };
    },
    methods: {
        getMeters() {
            let filter = { where: { } };
            if(this.meterId) {
                filter.where.meter_id = this.meterId;
            }  else {
                filter.where.company_id = this.companyId;
            }
            designatedMeters.find({
                filter
            }).then(res => {
                this.meters = res;

                if(this.meterId) {
                    this.bcItems[1].text = this.meters[0].device_name;
                    this.currentMeter = this.meters[0];
                }

                this.meters.forEach(meter => {
                    this.metersFilter[0].options.push({ value: meter.meter_id, text: meter.device_name });
                    /*meters.deviceVariables(meter.meter_id)
                    .then(vars => {
                       //meter.deviceVars = vars.deviceVars;
                       meter.dp = vars.deviceVars.var[1];
                       meter.epimp = vars.deviceVars.var[8];
                       this.currentMeter = meter;
                    });*/
                });
            });
        },
        getDeviceVariables(meter_id) {
            meters.deviceVariables(meter_id)
            .then(res => {
                console.log(res);
                this.dpVal = res.deviceVars.var[1].unitsFactor._text;
                this.epimpVal = res.deviceVars.var[8].unitsFactor._text;
                console.log(this.dpVal);
            });
        }
    }
};
