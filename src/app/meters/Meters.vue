<template>
    <b-row id="meters" class="main">
        <b-col>
            <Header :title="'Medidores'" :isMeters="true" :action="'Agregar Medidor'" :modalId="'meterModal'"/>
            <b-row class="list">
                <b-col>
                    <b-card  v-if="isAdmin" no-body>
                        <b-tabs pills card>
                            <b-tab title="Medidores Asignados" active>
                                <Table :items="itemsDesignated" :fields="fieldsDesignated" @clicked="openEDSDataModal" :alertMessage="'No hay medidores asignados.'" @statusChange="statusChange"/>
                            </b-tab>
                            <b-tab title="Medidores">
                                <Table :items="items" :fields="fields" @clicked="openAssignModal" :alertMessage="'No se encuentran medidores sin asignar.'"/>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                    <b-card  v-if="!isAdmin">
                        <Table :items="itemsDesignated" :fields="fieldsDesignated" :alertMessage="'Aún no tienes medidores.'"/>
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
        <b-modal ref="meterModalDesignate" id="meterModalDesignate" title="Asignar Medidor" @ok="assignMeter">
            <b-form @submit.stop.prevent="assignMeter">
                <b-form-group>
                    <b-form-input type="text" v-model="newDesignatedMeter.device_name" required placeholder="Nombre"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" v-model="newDesignatedMeter.hostname" required placeholder="Hostname"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-select :options="companies" v-model="newDesignatedMeter.company_id" />
                </b-form-group>
            </b-form>
        </b-modal>
        <b-modal ref="edsDataModal" id="edsDataModal" title="Información del EDS">
            <b-card no-body v-if="connectedDevices">
                <b-list-group flush>
                    <b-list-group-item v-for="device in connectedDevices" :key="device"><a href="#" class="card-link">{{device}}</a></b-list-group-item>
                </b-list-group>
            </b-card>
            <b-card v-if="!connectedDevices[0]">
                <b-alert show class="margin-top-1" variant="warning">Obteniendo la información del EDS...</b-alert>
            </b-card>
        </b-modal>
    </b-row>
</template>

<script src="./meters"></script>
