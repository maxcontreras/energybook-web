<template>
    <b-row class="header">
        <b-col md="12">
        <b-card>
            <div>
                <h3>{{title}}</h3>
                <b-button class="right" :variant="'outline-success'" v-if="action && !modalId && showAction" @click="goTo()">
                    {{action}}
                </b-button>
                <b-btn class="right" v-b-modal="modalId" variant="outline-success" v-if="modalId && action">{{action}}</b-btn>
            </div>
            <div class="filters-container">
                <b-form-select v-for="(filter, index) in filters" :key="index" @input="filterData(0)" v-model="filter.selected" :options="filter.options" class="mb-3" />
            </div>
        </b-card>
        </b-col>
    </b-row>
</template>

<script src="./header"></script>