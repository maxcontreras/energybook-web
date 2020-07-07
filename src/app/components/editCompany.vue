<template>
    

    <div>
            <b-button  
                @click="$bvModal.show(DataCompany.id)"
                    title="Click para editar empresa"
                    variant="primary">
                Editar
                </b-button>


  <b-modal :id="DataCompany.id" hide-footer :title="DataCompany.name">
        <b-row>

            <b-col>
                <b-form-group label="Nombre comercial">
                    <b-form-input
                        type="text"
             v-model="company.company_name"
                        required
                        placeholder="Nombre comercial">
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Razón Social">
                    <b-form-input
                        type="text"
                          v-model="company.legal_name"
                        required
                        placeholder="Razón social">
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Teléfono">
                    <b-form-input
                        type="number"
                          v-model="company.phone"
                        required
                        placeholder="Teléfono">
                    </b-form-input>
                </b-form-group>
                  <b-form-group label="Dominio">
                    <b-form-input
                    type="string"
                        v-bind="company.domain"
                    required 
                    placeholder="Dominio"
                    />
                </b-form-group>
                <b-form-group label="coordenadas">
                    <b-form-input
                        class="company-position"
                        type="text"
                         v-model="company.location.lat"
                        required
                        placeholder="Latitud">
                    </b-form-input>
                    <b-form-input
                        class="company-position"
                        type="text"
                           v-model="company.location.lon"
                        required
                        placeholder="Longitud">
                    </b-form-input>
                </b-form-group>


                
                <b-form-group label="Dirección">
                    <b-form-input
                        type="text"
                        required
                        v-model="company.address"
                        placeholder="Dirección">
                    </b-form-input>
                </b-form-group>


                          <b-form-group :label="'Fecha de facturacion: '+ company.facturacion">
                         <date-picker
                         required
                        v-model="company.facturacion"
                      @dp-change="setCustomDate"
                        :config="dateConfig"
                      > </date-picker>


                </b-form-group>
                </b-col>


        <b-form-group label="Tarifa">
          <b-form-select v-model="company.tariff_type" :options="options" />
        </b-form-group>
        </b-row>



       <b-button variant="success"
                        @click="patchCompany">
                        Editar
                    </b-button>
  </b-modal>

    </div>

</template>

<script>
import companies from '../../services/companies.js';
import datePicker from 'vue-bootstrap-datetimepicker';
import { parseDate, parseDateTime, parseDayName, parseMonth } from '@/utils/dateTime';
export default {
      components: {
        datePicker
    },
    
    name:'editCompany',
    props: {
        DataCompany: Object
    },    

    mounted(){
        console.log(this.DataCompany.id)
console.log(this.DataCompany)
 
companies.find({}).then(res =>{

res.forEach(companie => {


if(companie.id == this.DataCompany.id){
    console.log(companie)
   this.company.company_name = companie.company_name;
     this.company.legal_name = companie.legal_name;
     this.company.phone = companie.phone;
      this.company.location.lat = companie.location.lat;
         this.company.location.lon = companie.location.lon;
       this.company.address = companie.address;
       this.company.domain = companie.domain;
       this.company.facturacion = companie.facturacion;
       this.company.tariff_type = companie.tariff_type;
       this.company.state = companie.state;
}
    
});







})

    },
    
    
    
    methods: {

        patchCompany(){
           let id = this.DataCompany.id
          

companies.updateData({ data: {
    company: {
    id: id,
    company_name: this.company.company_name,
    legal_name: this.company.legal_name,
    phone: this.company.phone,
    location: {
        lat: this.company.location.lat,
        lon: this.company.location.lon
    },
    address: this.company.address,
    domain: this.company.domain









}}}).then(msg => {
    console.log(msg);
}).catch(err => {
    console.log(err)
})
    location.reload();
        },

      showModal() {
    this.$bvModal.show(this.DataCompany.id)
      }

    },
    data(){
        return {

               date_custom: '',
          dateConfig: {
          inline: true,
        format: "YYYY-MM-DD",
        useCurrent: false
          },
           options: [
        { value: "GDMTH", text: "Gran demanda media tensión horaria (GDMTH)" },
        {
          value: "GDMTO",
          text: "Gran demanda media tensión ordinaria (GDMTO)"
        },
        {
          value: "GDMTO",
          text: "Gran demanda baja tensió (GDBT)",
          disabled: true
        },
        {
          value: "GDMTO",
          text: "Pequeña demanda baja tensión (PDBT)",
          disabled: true
        }
      ],
                company: {
                company_name: '',
                phone: '',
                size: 'Mediana',
                location: {
                    lat: '',
                    lon: ''
                },
                city: 0,
                created_at: new Date(),
                legal_name: '',
                address: '',
                domain: '',
                facturacion: '',
                Division: '',
                state: '',
                tariff_type: '',
            },
        }
    }
}
</script>