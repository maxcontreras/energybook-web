/* eslint-disable */
import companies from '@/services/companies';
import Header from '@/app/components/header/Header.vue';

export default {
    components: {
        Header
    },
    data() {
        return {
            companies: []
        }
    },

    beforeMount() {
        this.getCompanies();
    },

    methods: {
        getCompanies() {
            companies.find({}).then(res => this.companies = res);
        }
    }
}