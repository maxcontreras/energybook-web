<template>
    <div>
    <b-table responsive hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage"></b-table>
    <b-row class="table-pagination">
            <b-col md="1" class="my-1">
                <b-form-select :options="pageOptions" v-model="perPage" />
            </b-col>
            <b-col md="6" class="my-1">
                <b-pagination :total-rows="items.length" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
    </b-row>
    </div>
</template>

<script src="./table"></script>