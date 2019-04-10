<template>
    <b-row>
        <b-col lg="6">
            <h3>Compañía designada para pruebas de software</h3>
            <ul v-if="freeTrialCompany">
                <li :key="company.id" v-for="company in freeTrialCompany">
                    {{ company.company_name }}
                </li>
            </ul>
            <b-alert
                v-else
                show
                variant="warning">
                No existe una compañía designada para prueba de software
            </b-alert>
        </b-col>
        <b-col lg="6">
            <h3>Designar compañía</h3>
            <b-form-select v-model="selectedCompany" :options="companies"/>
            <b-btn>Designar</b-btn>
        </b-col>
    </b-row>
</template>

<script>
import company from '@/services/companies';

export default {
    data() {
        return {
            selectedCompany: null,
            raw_companies: [],
            freeTrialCompany: null
        };
    },

    beforeMount() {
        this.getCompanies();
    },

    computed: {
        companies() {
            return this.raw_companies.map(company =>
                ({
                    value: company.id,
                    text: company.company_name
                })
            );
        }
    },

    methods: {
        getCompanies() {
            company.find({
                where: { status: 1 }
            })
                .then(res => {
                    this.raw_companies = res.filter(company => !company.for_free_trial);
                    this.selectedCompany = this.raw_companies[0] && this.raw_companies[0].id;
                    let ftc = res.filter(company => company.for_free_trial);
                    this.freeTrialCompany = ftc && ftc[0];
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}
</script>

<style lang="scss" scoped>
h3 {
    font-size: 1.1rem;
    margin-bottom: 2rem;
}
</style>
