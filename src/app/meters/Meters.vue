<template>
    <b-row id="meters" class="main">
        <b-col>
            <Header :title="'Medidores'" :isMeters="true" :action="'Agregar Medidor'" :modalId="'meterModal'"/>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <Table :items="items" :fields="fields"/>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
        <b-modal id="meterModal" title="Medidor Nuevo" @ok="createMeter">
            <b-form @submit.stop.prevent="createMeter">
                <b-form-group>
                    <b-form-input type="text" v-model="newMeter.serial_number" required placeholder="Número de Serie"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-select :options="companies" v-model="newMeter.company_id" />
                </b-form-group>
            </b-form>
        </b-modal>
    </b-row>
</template>

<script src="./meters"></script>