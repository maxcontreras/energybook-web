<template>
    <div class="list">
        <b-alert
            v-if="items.length === 0"
            show
            class="margin-top-1"
            variant="success"
            >
            {{ alertMessage }}
        </b-alert>
        <b-table
            v-if="items.length > 0"
            responsive
            hover 
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            @row-clicked="rowClickHandler"
            >
            <template
                slot="Status"
                slot-scope="data">
                <b-button
                    title="Click para cambiar estado"
                    @click="statusChange(data.item.id, data.item.Status)"
                    :pressed.sync="data.item.Status" variant="primary">
                    {{ data.item.Status? 'Activo' : 'Inactivo' }}
                </b-button>
            </template>
        </b-table>
        <b-row
            v-if="items.length > 0"
            class="table-pagination"
            >
            <b-col md="2" class="my-1">
                <b-form-select
                    :options="pageOptions"
                    v-model="perPage" />
            </b-col>
            <b-col md="6" class="my-1">
                <b-pagination
                    class="my-0"
                    :total-rows="items.length"
                    :per-page="perPage"
                    v-model="currentPage"
                    />
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    props: ['items', 'fields', 'route', 'alertMessage'],
    data() {
        return {
            currentPage: 1,
            perPage: 5,
            pageOptions: [ 5, 10, 15 ]
        }
    },
    methods: {
        rowClickHandler(record, index) {
            if(this.route) {
                if(this.route === 'companyDetail') {
                    this.$store.commit('setCurrentCompanyDetailId', record.id)
                    this.$router.push({name: this.route})
                }
                this.$router.push({name: this.route, params: {id: record.id}});
            } else {
                this.$emit('clicked', {id: record.id, index });
            }
        },
        statusChange(rowId, status) {
            console.log(rowId, status);
            this.$emit('statusChange', {id: rowId, status: status? 1: 0});
        }
    }
}
</script>
