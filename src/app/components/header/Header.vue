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
                <b-form-select v-for="(filter, index) in filters" :key="index" v-model="filter.selected" :options="filter.options" class="mb-3" />
                <b-button :variant="'outline-success'" v-if="filters && filters[0]" @click="filterData()">
                    Buscar
                </b-button>
            </div>
        </b-card>
        </b-col>
    </b-row>
</template>

<script src="./header"></script>