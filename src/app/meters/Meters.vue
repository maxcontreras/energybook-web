<template>
    <b-row id="meters" class="main">
        <b-col>
            <Header :title="'Medidores'" :isMeters="true" :action="'Agregar Medidor'" :modalId="'meterModal'"/>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <b-tabs v-if="isAdmin">
                            <b-tab title="Medidores Asignados" active>
                                <Table :items="itemsDesignated" :fields="fieldsDesignated" :alertMessage="'No hay medidores asignados.'" @statusChange="statusChange"/>
                            </b-tab>
                            <b-tab title="Medidores">
                                <Table :items="items" :fields="fields" @clicked="openAssignModal" :alertMessage="'No se encuentran medidores sin asignar.'"/>
                            </b-tab>
                        </b-tabs>
                        <Table v-if="!isAdmin" :items="itemsDesignated" :fields="fieldsDesignated" :alertMessage="'Aún no tienes medidores.'"/>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
        <b-modal id="meterModal" title="Medidor Nuevo" @ok="createMeter" @shown="clearNewMeter">
            <b-form @submit.stop.prevent="createMeter">
                <b-form-group>
                    <b-form-input type="text" v-model="newMeter.serial_number" required placeholder="Número de Serie"></b-form-input>
                </b-form-group>
            </b-form>
        </b-modal>
        <b-modal ref="meterModalDesignate" id="meterModalDesignate" title="Asignar Medidor" @ok="assignMeter" @shown="clearNewDesignatedMeter">
            <b-form @submit.stop.prevent="assignMeter">
                <b-form-group>
                    <b-form-input type="text" v-model="newDesignatedMeter.device_name" required placeholder="Nombre"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-select :options="companies" v-model="newDesignatedMeter.company_id" />
                </b-form-group>
            </b-form>
        </b-modal>
    </b-row>
</template>

<script src="./meters"></script>