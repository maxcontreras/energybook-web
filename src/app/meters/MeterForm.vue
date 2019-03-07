<template>
    <confirmation-dialog
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

export default {
    name: 'MeterForm',
    components: {
        ConfirmationDialog,
        MeterData
    },
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
                max_value: '',
                min_value: '',
                company_id: null
            }
        };
    },
    methods: {
        validateData() {
            if (this.meter.device_name && this.meter.company_id &&
                this.meter.serial_number && this.meter.max_value > 0 &&
                this.meter.min_value >= 0 &&
                this.meter.max_value > this.meter.min_value) {
                    this.$emit('create', _l.cloneDeep(this.meter));
                    this.resetMeter();
            } else {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    text: 'Verifica que los campos estén llenados correctamente'
                });
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
                company_id: ''
            }
        }
    }
}
</script>
