<template>
    <confirmation-dialog
    title="Nuevo Medidor"
        :show="showForm"
        acceptText="Crear"
        @accept="validateData"
        @cancel="cancelCreation"
        @hidden="cancelCreation">
        <meter-data
            :companies="companies"
            :meter="meter"/>
    </confirmation-dialog>
</template>

<script>

import ConfirmationDialog from '@/app/components/ConfirmationDialog.vue';
import _l from 'lodash';
import MeterData from './MeterData.vue';
import notify from '@/mixins/notify';

export default {
    name: 'MeterForm',
    components: {
        ConfirmationDialog,
        MeterData
    },
    mixins: [notify('notification')],
    props: {
        showForm: {
            type: Boolean,
            required: true
        },
        companies: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            meter: {
                device_name: '',
                serial_number: '',
                hostname: '',
                max_value: '',
                min_value: 0,
                company_id: null,
                tipo: "EDS DELUXE"
            }
        };
    },
    methods: {
        validateData() {
            const valuesValid = this.meter.device_name && this.meter.company_id &&
                this.meter.serial_number && this.meter.max_value > 0 &&
                this.meter.min_value >= 0 &&
                this.meter.max_value > this.meter.min_value;
            const httpRegexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.){1}[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
            const hostnameValid = httpRegexp.test(this.meter.hostname);
            if (valuesValid && hostnameValid) {
                    this.$emit('create', _l.cloneDeep(this.meter));
                        

                    this.resetMeter();
            } else {
                this.notify('', 'Verifica que los campos estén llenados correctamente', 'warn');
            }
        },
        cancelCreation() {
            this.resetMeter();
            this.$emit('hide');
        },
        resetMeter() {
            this.meter = {
                serial_number: '',
                device_name: '',
                max_value: '',
                min_value: '',
                company_id: null,
                 tipo: ''
            }
        }
    }
}
</script>
