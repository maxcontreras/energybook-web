/* eslint-disable */
import companies from '@/services/companies';

export default {
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