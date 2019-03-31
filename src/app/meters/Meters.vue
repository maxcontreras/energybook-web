<template>
    <b-row
        id="meters"
        class="main">
        <b-col>
            <b-row class="header">
                <b-col md="12">
                    <b-btn
                        class="right"
                        :variant="'success'"
                        @click="openMeterForm">
                        Agregar Medidor
                    </b-btn>
                </b-col>
            </b-row>
            <b-row class="list">
                <b-col>
                    <b-card
                        v-if="isAdmin"
                        no-body>
                        <b-tabs pills card>
                            <b-tab
                                title="Medidores"
                                active>
                                <v-table
                                    :items="metersAssignedFormatted"
                                    :fields="fieldsDesignated"
                                    @clicked="openEDSDataModal"
                                    :alertMessage="'No hay medidores asignados.'"/>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
        <meter-form
            :showForm="showMeterForm"
            :companies="companies"
            @create="createMeter"
            @hide="hideMeterForm"/>
        <b-modal
            ref="edsDataModal"
            id="edsDataModal"
            title="Información del EDS"
            @ok="editMeter">
            <b-card
                no-body
                v-if="connectedDevices">
                <b-tabs pills card>
                    <b-tab
                        title="Dispositivos"
                        active>
                        <b-list-group flush>
                            <b-list-group-item
                                v-for="(device, index) in connectedDevices"
                                :key="device.name">
                                <a href="#" class="card-link">
                                    {{ index !== 0 ? device.description : undefined }}
                                </a>
                            </b-list-group-item>
                        </b-list-group>
                        <b-card v-if="!connectedDevices[0]">
                            <b-alert
                                show
                                class="margin-top-1"
                                variant="warning">
                                Obteniendo la información del EDS...
                            </b-alert>
                        </b-card>
                    </b-tab>
                    <b-tab
                        v-for="(service, index) in shownServices"
                        :key="index"
                        :title="service.name">
                        <b-form-group>
                            <b-form-checkbox-group v-model="service.selected" stacked :options="service.options" />
                        </b-form-group>
                    </b-tab>
                    <b-tab
                        title="Datos">
                        <meter-data
                            :companies="companies"
                            :meter="shownMeter"/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-modal>
    </b-row>
</template>

<script src="./meters"></script>
