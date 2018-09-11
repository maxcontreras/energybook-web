<template>
    <div class="list">
    <b-alert show class="margin-top-1" variant="success" v-if="items.length === 0">{{alertMessage}}</b-alert>
    <b-table responsive hover v-if="items.length > 0"
    :items="items" 
    :fields="fields" 
    :current-page="currentPage" 
    :per-page="perPage"
    @row-clicked="rowClickHandler">
        <template slot="Status" slot-scope="data">
            <b-button title="Clic para cambiar estado" @click="statusChange(data.item.id, data.item.Status)" :pressed.sync="data.item.Status" variant="primary">{{data.item.Status? 'Activo' : 'Inactivo'}}</b-button>
        </template>
    </b-table>
    <b-row class="table-pagination" v-if="items.length > 0">
            <b-col md="2" class="my-1">
                <b-form-select :options="pageOptions" v-model="perPage" />
            </b-col>
            <b-col md="6" class="my-1">
                <b-pagination :total-rows="items.length" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
    </b-row>
    </div>
</template>

<script src="./table"></script>