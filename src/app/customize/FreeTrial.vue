<template>
    <b-row>
        <b-col lg="6">
            <h3>Compañía designada para pruebas de software</h3>
            <h5 v-if="freeTrialCompany">
                <i class="fas fa-building"></i>
                {{ freeTrialCompany.company_name }}
                <i
                    class="fas fa-times-circle"
                    @click="removeCompany"></i>
            </h5>
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
            <div class="text-center">
                <b-btn
                    class="designate-btn"
                    @click="designateCompany">
                    Designar
                </b-btn>
            </div>
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
        },

        designateCompany() {
            if (this.freeTrialCompany) {
                company.patch({ id: this.freeTrialCompany.id }, { for_free_trial: false })
                    .then(updated => {
                        this.raw_companies.push(updated);
                        return company.patch({ id: this.selectedCompany }, { for_free_trial: true })
                    })
                    .then((freetrialCompany) => {
                        this.freeTrialCompany = freetrialCompany;
                        this.raw_companies = this.raw_companies.filter(company => company.id !== this.selectedCompany);
                        this.selectedCompany = this.raw_companies[0] && this.raw_companies[0].id;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                company.patch({ id: this.selectedCompany }, { for_free_trial: true })
                    .then((freetrialCompany) => {
                        this.freeTrialCompany = freetrialCompany;
                        this.raw_companies = this.raw_companies.filter(company => company.id !== this.selectedCompany);
                        this.selectedCompany = this.raw_companies[0] && this.raw_companies[0].id;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            
        },

        removeCompany() {
            company.patch({ id: (this.freeTrialCompany) ? this.freeTrialCompany.id : '' }, { for_free_trial: false })
                .then(updated => {
                    this.freeTrialCompany = null;
                    this.raw_companies.push(updated);
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

.designate-btn {
    margin-top: 2rem;
}

.custom-select {
    padding-bottom: 3px;
}

.fa-building {
    margin-right: 1rem;
}

.fa-times-circle {
    position: absolute;
    right: 0;
    color: rgb(216, 25, 25);
    cursor: pointer;
}
</style>
