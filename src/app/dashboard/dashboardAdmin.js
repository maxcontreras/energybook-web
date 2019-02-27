/* eslint-disable */
import VHeader from '@/app/components/VHeader.vue';
import companies from '@/services/companies';
import VTable from '@/app/components/VTable.vue';
import {gmapApi} from 'vue2-google-maps';

export default {
    components: {
        VHeader,VTable
    },

    computed: {
        google: gmapApi
    },

    watch: {
        companies(newValue, oldValue) {
            if (newValue.length !== oldValue) {
                newValue.forEach((company, index) => {
                    if (company.location && this.google) {
                        this.setMarkers(company.location, index);
                    }
                });
            }
        },
        google(newVal) {
            if (newVal) {
                this.companies.forEach((company, index) => {
                    if (company.location) {
                        this.setMarkers(company.location, index);
                    }
                });
            }
        }
    },

    beforeMount() {
        companies.find({}).then(res => {
            let companiesArr = res;
            this.companies = res;
            companiesArr.forEach((company, index) => {
                this.items.push({
                    'Nombre': company.company_name,
                    'Fecha de Registro': moment(company.created_at).format('LL')
                });
                if (company.location && this.google) {
                    this.setMarkers(company.location, index);
                }
            });
        }).catch(err => {
            console.log('error al traer compañias', err);
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
            markers: [],
            infoWinOpen: false,
            infoWindowPos: {
                lat: 0,
                lng: 0
            },
            infoOptions: {
                pixelOffset: {
                    width: 0,
                    height: -35
                }
            },
            infoContent: "",
            currMarkerIdx: null
        };
    },

    methods: {
        setMarkers(location, index) {
            this.markers.push({
                companyIndex: index,
                position: {
                    lat: location.lat,
                    lng: location.lon
                },
                icon: {
                    size: new this.google.maps.Size(40,80),
                    scaledSize: new this.google.maps.Size(40,80),
                    url: '/assets/images/marker.svg'
                }
            });
        },
        showInfo(marker, index) {
            if (index !== this.currMarkerIdx) {
                this.currMarkerIdx = index;
                this.infoWinOpen = true;
                this.infoWindowPos = marker.position;
                this.infoContent = `<html>
                    <body>
                        <h5>${this.companies[marker.companyIndex].company_name}</h5>
                    </body>
                </html>`
            } else {
                this.infoWinOpen = false;
                this.currMarkerIdx = null;
            }
            
        }
    }
};
