<template>
    <div>
        <b-form-group>
            <b-form-input
                placeholder="Nombre"
                type="text"
                v-model="meter.device_name">
            </b-form-input>
        </b-form-group>
        <b-form-group>
            <b-form-input
                placeholder="Hostname"
                type="text"
                v-model="meter.hostname">
            </b-form-input>
        </b-form-group>
        <b-form-group>
            <b-form-input
                type="text"
                v-model="meter.serial_number"
                required
                placeholder="Número de Serie">
            </b-form-input>
        </b-form-group>
        <b-row>
            <b-col>
                <b-form-group>
                    <b-form-input
                        placeholder="Valor mínimo"
                        type="number"
                        v-model="meter.min_value">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <b-form-input
                        placeholder="Valor máximo"
                        type="number"
                        v-model="meter.max_value">
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-form-group>
            <b-form-select
                :options="companies"
                v-model="meter.company_id" />
        </b-form-group>
    </div>
</template>

<script>

export default {
    props: {
        companies: {
            type: Array,
            required: true
        },
        meter: {
            type: Object,
            required: true
        }
    }
}
</script>