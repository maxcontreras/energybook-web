<template>
    <b-row class="header">
        <b-col md="12">
        <b-card>
            <div>
                <h3>{{title}}</h3>
                <b-button class="right" :variant="'outline-success'" v-if="action">
                    {{action}}
                </b-button>
            </div>
            <div class="filters-container">
                <b-form-select v-for="(filter, index) in filters" :key="index" @input="filterData(0)" v-model="filter.selected" :options="filter.options" class="mb-3" />
                <div class="dashboard-buttons--container" v-if="isDashboard && (companySelected || !isAdmin)">
                    <b-button v-for="(button, index) in buttons[0].options" :key="index" v-bind:class="{'btn-success': dashboardSelected === button.value, 'btn-outline-success':dashboardSelected !== button.value}" @click="filterData(button.value)">
                        {{button.text}}
                    </b-button>
                </div>
            </div>
        </b-card>
        </b-col>
    </b-row>
</template>

<script src="./header"></script>