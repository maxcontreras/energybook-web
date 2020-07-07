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
                <b-form-group   
                    label="   Indica la demanda máxima contratada">
                </b-form-group >
        <b-row>
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
        <b-form-group      label="    Indica el tipo de meter que se esta utilizando">
              

           <b-form-select v-model="meter.tipo" :options="options"  class="mt-3"></b-form-select>
    
        </b-form-group>
    </div>
</template>

<script>

export default {
    data(){
return {

        options: [
          { value: "EDS DELUXE", text: 'EDS Deluxe' },
          { value: "AcuLink 810", text: 'AcuLink 810' },
          { value: "Acuvim II", text: 'Acuvim II' },
        ]


}



    },


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