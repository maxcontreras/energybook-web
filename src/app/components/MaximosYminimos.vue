<template>
<div>
     <button
       @click="$bvModal.show(DataDesignated.id)"
      title="Click para ver/editar Maximos y minimos"
      variant="primary"
      class="btn"
    >


      <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
    </button>


    <b-modal :id="DataDesignated.id">
      <div slot="modal-title" class="clearfix">
{{DataDesignated.Compañía}}
      </div>



  <b-row>
    <b-col>  <p> Maximo Costo por dia</p>  </b-col>
    <b-col><p>Minimo Costo por dia </p></b-col>
  </b-row>

    <b-row>
        
    <b-col>        
        <b-form-input
          v-model="max"
          required
          type="number"
          placeholder="Max"
        ></b-form-input>
         </b-col>
    <b-col>      <b-form-input
          v-model="min"
          required
          type="number"
          placeholder="Max"
        ></b-form-input> </b-col>
  </b-row>

<br>
<br>
<br>
      <b-row>

    <b-col>  </b-col>

    <b-col> 
        <b-button    
        @click="guardar(DataDesignated.id,min,max), $bvModal.hide(DataDesignated.id)"   title="Click para Cambiar "
      variant="secondary"
      class="btn"> Aceptar cambios </b-button> 
    </b-col>
       <b-col>  </b-col>
  </b-row>






    

      <div slot="modal-footer">
        <b-button @click="$bvModal.hide(DataDesignated.id)">Salir</b-button>
      </div>
    </b-modal>





    </div>
</template>

<script>
import designatedMeters from '@/services/designatedMeters';
export default {
  props: {
    DataDesignated: Object
  },
    methods: {
        guardar(id,min,max){

            designatedMeters.find({filter:{
                where:{
                    id: id
                }
            }}).then(
                respuesta =>{
                    respuesta[0].min_value = min
                     respuesta[0].max_value = max
                         respuesta[0].id = undefined
                         respuesta[0].generationDevices = undefined

                     designatedMeters.PATCH(id,respuesta[0]).then(respuesta=>{

                              this.$notify({
                    group: 'notification',
                    type: 'success',
                    text: 'Se hicieron los cambios correctamente'
                });

               
                     }).catch(err=>{

                                   this.$notify({
                    group: 'notification',
                    type: 'error',
                    text: 'No se hicieron los cambios'
                });
                         console.log(err)
                     })
                }
            ).catch(err=>{
                console.log(err)
            })

        },
    showModal() {
      this.$bvModal.show(this.DataDesignated.id);
    }
  },
  beforeMount(){


      designatedMeters.find({filter:{
          where:{
              id: this.DataDesignated.id
           
          }
      }}).then(respuesta=>{
     
this.max = respuesta[0].max_value;
this.min = respuesta[0].min_value;

      }).catch(err =>{
          console.log(err)
      })



  },
   data() {
    return {
        min: '',
        max: '',
      company: {
        company_name: "",
        phone: "",
        size: "Mediana",
        location: {
          lat: "",
          lon: ""
        },
        city: 0,
        created_at: new Date(),
        legal_name: "",
        address: "",
        domain: ""
      }
    };
  }
}


</script>

<style>

</style>