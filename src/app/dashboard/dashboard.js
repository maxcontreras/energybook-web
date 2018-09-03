/* eslint-disable */

import meters from '@/services/meters';
import designatedMeters from '@/services/designatedMeters';
import Table from '@/app/components/table/Table.vue';
import {gmapApi} from 'vue2-google-maps'
import Weather from 'vue-weather-widget';
import 'vue-weather-widget/dist/css/vue-weather-widget.css';

var position = {lat:'20.663782', lng:'-103.3916394'}

export default {
    components: {
        Table, Weather
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
    created() {
        this.$store.watch(
            () => {
                return this.$store.state.currentView;
            },
            () => {
                this.meterId = this.$route.params.id;
                this.getMeters();
            }
        );
    },
    beforeMount() {
        /*navigator.geolocation.getCurrentPosition(function(location) {
            position.lat = location.coords.latitude+'';
            position.lng = location.coords.longitude+'';
        });*/
        this.getMeters();
    },
    data() {
        return {
            meters: [],
            meterId: '',
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
                }

                this.meters.forEach(meter => {
                    /*meters.deviceVariables(meter.meter_id)
                    .then(res => {
                       //meter.deviceVars = res.deviceVars;
                       meter.dp = res.deviceVars.var[1];
                       meter.epimp = res.deviceVars.var[8];
                    });*/
                });
            });
        }
    }
};
