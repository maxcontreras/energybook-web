<template>
  <div>
    <button
      @click="$bvModal.show(DataNotificacion.id)"
      title="Click para ver notificacion"
      variant="primary"
      class="btn"
    >
      <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
    </button>

    <b-modal :id="DataNotificacion.id">
      <div slot="modal-title" class="clearfix">
        {{DataNotificacion.tipo}}
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <b-img right src="/assets/logo.png" alt="iEnergybook" width="40" height="40"></b-img>
      </div>

      <div>

<b-container class="Dispositivos">
  <b-row>
    <b-col cols="6" >  
      <p
      class="text-center"
          v-for="Dispositivos in this.arregloNombres"
          :key="(Dispositivos,index)"
        > <strong>{{Dispositivos}} </strong>
      </p>
        
    </b-col>
    <b-col cols="3">    <p
          class="text-center"
          v-for="valores in this.arreglovalores"
          :key="(valores,index)"
        >{{valores}}
      </p>   </b-col>
  </b-row>
</b-container>

      </div>

      <p class="text-center"> <strong> Servicios </strong></p> <br>

      <div>

        <b-container class="Servicios">
  <b-row>
    <b-col cols="6" >  
        <p
            class="text-center"
          v-for="Servicios in this.arregloservicios"
          :key="(Servicios,index)"
        > <strong> {{Servicios}} </strong></p>
        
    </b-col>
    <b-col cols="3">    <p

          class="text-center"
          v-for="valoresServicios in this.arregloValoresServicios"
          :key="(valoresServicios,index)"
        >{{valoresServicios}}
      </p>   </b-col>
  </b-row>
</b-container>



 




      </div>

      <div slot="modal-footer">
        <b-button @click="$bvModal.hide(DataNotificacion.id)">Salir</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import companies from "../../services/companies.js";
export default {
  name: "editCompany",
  props: {
    DataNotificacion: Object
  },
  methods: {
    showModal() {
      this.$bvModal.show(this.DataNotificacion.id);
    }
  },
  mounted(){

    this.DataNotificacion.Dispositivos.forEach(element => {
  
 var res = element.split(" ");

 if(res.length ==1 ){
   this.arregloNombres.push(res[0])
    this.arreglovalores.push(res[0])
 }

 if(res.length == 4){


this.arregloNombres.push(res[0]+ " " + res[1])
this.arreglovalores.push(res[2] + " "+ res[3])

 }

  if(res.length == 3){
    if(res[2].charAt(0) == "$"){// si es de costo 
    
this.arregloNombres.push(res[0] + " " + res[1])
this.arreglovalores.push( res[2])
    }else{// si no es de costo pero tiene 3 valores


this.arregloNombres.push(res[0])
this.arreglovalores.push(res[1] + " "+ res[2])

    }

 }

    if(res.length == 2){
       this.arregloNombres.push(res[0])
this.arreglovalores.push(res[1])



     }



    });
   
   //AHORA HACEMOS LO MISMO PARA SERVICIOS


    this.DataNotificacion.Servicios.forEach(element => {

       var respuesta = element.split(" ");


        if(respuesta.length ==1 ){
   this.arregloservicios.push(respuesta[0])
    this.arregloValoresServicios.push(respuesta[0])
 }

     if(respuesta.length==4){

       
this.arregloservicios.push(respuesta[0]+ " " + respuesta[1])
this.arregloValoresServicios.push(respuesta[2]+ " " + respuesta[3])
       


     }

          if(respuesta.length==3){
this.arregloservicios.push(respuesta[0]+ " " + respuesta[1])
this.arregloValoresServicios.push(respuesta[2])
       


     }
     console.log(respuesta)




    });



      /* 
      console.log(this.arregloNombres)
      console.log(this.arreglovalores)

      console.log(this.arregloservicios)
      console.log(this.arregloValoresServicios)


      */
      
  

  },
  data() {
    return {
      arregloservicios:[],
      arregloValoresServicios: [],
      arregloNombres: [],
      arreglovalores: [],
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
};
</script>