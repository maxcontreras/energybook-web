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
                <b-form-group>
                    <b-form-input
                        type="text"
             v-model="company.company_name"
                        required
                        placeholder="Nombre comercial">
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="text"
                          v-model="company.legal_name"
                        required
                        placeholder="Razón social">
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="number"
                          v-model="company.phone"
                        required
                        placeholder="Teléfono">
                    </b-form-input>
                </b-form-group>
                  <b-form-group>
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
                <b-form-group>
                    <b-form-input
                        type="text"
                        required
                        v-model="company.address"
                        placeholder="Dirección">
                    </b-form-input>
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
import companies from '../../services/companies.js'
export default {
    
    name:'editCompany',
    props: {
        DataCompany: Object
    },    methods: {

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
            },
        }
    }
}
</script>