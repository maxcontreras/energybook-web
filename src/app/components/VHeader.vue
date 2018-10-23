<template>
    <b-row class="header">
        <b-col md="12">
            <div>
                <!--<h3>{{title}}</h3>-->
                <b-button
                    v-if="action && !modalId && showAction"
                    class="right"
                    :variant="'success'"
                    @click="goTo()">
                    {{action}}
                </b-button>
                <b-btn
                    v-if="modalId && action && showAction"
                    class="right"
                    v-b-modal="modalId"
                    :variant="'success'"
                    >
                    {{ action }}
                </b-btn>
            </div>
            <div class="filters-container">
                <b-form-select
                    v-for="(filter, index) in filters"
                    :key="index"
                    @input="filterData(filter.selected)"
                    v-model="filter.selected"
                    :options="filter.options" class="mb-3" />
            </div>
        </b-col>
    </b-row>
</template>

<script>
/* eslint-disable */
export default {
    props: ['title', 'action','filters','buttons', 'isDashboard', 'modalId', 'isMeters','route','params'],
    data() {
        return {
            dashboardSelected: 0,
            companySelected: false
        }
    },
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin;
        },
        isManager() {
            return this.$store.state.isManager;
        },
        showAction() {
            return (this.isAdmin && this.isMeters) || !this.isMeters;
        }
    },
    methods: {
        filterData(val) {
            //this.dashboardSelected = val;
            //this.companySelected = this.filters[0] && this.filters[0].selected !== null;
            // TODO: sent meter id and device name to function getByFilter 
            if(this.isAdmin) {
                this.$emit('SearchData', this.dashboardSelected, this.filters[0].selected);
            } else {
                this.$emit('SearchData', val)
            }
        },
        goTo() {
            if(this.route) {
                this.$router.push({name: this.route});
            }
        }
    }
}
</script>
