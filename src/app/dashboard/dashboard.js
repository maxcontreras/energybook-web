/* eslint-disable */

// add meters find to function
// divide: general, and meters (submenus) or for each meter ??
import Header from '@/app/components/header/Header.vue';
import companies from '@/services/companies';
import meters from '@/services/meters';
import Table from '@/app/components/table/Table.vue';
import Analysis from '@/app/components/analysis/Analysis.vue';
import {gmapApi} from 'vue2-google-maps'

export default {
    components: {
        Header,Table, Analysis
    },
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin;
        },
        isManager() {
            return this.$store.state.isManager;
        },
        currentFormattedDate() {
            return moment(this.currentDate).format('dddd, MMMM Do YYYY');
        },
        filters() {
            return this.isAdmin? [this.companiesVal]:[];
        },
        companyId() {
            return this.$store.state.company_id;
        },
        google: gmapApi
    },
    watch: {
        companyId() {
            meters.find({
                where: { company_id: this.companyId }
            }).then(meters => {
                this.meters = meters;
            });
        }
    },
    beforeMount() {
        companies.find({}).then(res => {
            let companiesArr = res;
            companiesArr.forEach(company => {
                //this.companiesVal.options.push({ value: company.id, text: company.company_name });
                this.items.push({
                    'Nombre': company.company_name,
                    'Fecha de Registro': moment(company.created_at).format('LL')
                });
            });
        });
        meters.find({
            where: { company_id: this.companyId }
        }).then(meters => {
            console.log(meters);
            this.meters = meters;
        });
    },
    data() {
        return {
            items: [],
            fields: [{
                key: 'Nombre',
                sortable: true
            }, 'Fecha de Registro'],
            meters: []
        };
    },
    methods: {
        
    }
};
