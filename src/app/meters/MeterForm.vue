<template>
    <b-form @submit.stop.prevent="formSubmit">
        <b-form-group>
            <b-form-input
                placeholder="Nombre"
                type="text"
                v-model="meter.device_name"
                required
                >
            </b-form-input>
        </b-form-group>
        <b-form-group>
            <b-form-input
                placeholder="Hostname"
                type="text"
                v-model="meter.hostname"
                required
                >
            </b-form-input>
        </b-form-group>
        <b-row>
            <b-col>
                <b-form-group>
                    <b-form-input
                        placeholder="Valor máximo"
                        type="number"
                        v-model="meter.max_value"
                        required
                        >
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <b-form-input
                        placeholder="Valor mínimo"
                        type="number"
                        v-model="meter.min_value"
                        required
                        >
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-form-group>
            <b-form-select
                :options="companies"
                v-model="meter.company_id" />
        </b-form-group>
    </b-form>
</template>

<script>
export default {
    name: 'MeterForm',
    props: {
        formSubmit: {
            type: Function,
            default: function() {}
        },
        meter: {
            type: Object,
            default: function() {
                return {
                    device_name: '',
                    created_at: new Date(),
                    company_id: null,
                    meter_id: ''
                };
            }
        },
        companies: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style>
</style>
