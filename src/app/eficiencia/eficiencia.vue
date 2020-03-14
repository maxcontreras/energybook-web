<template>
  <b-row>


    <b-col cols="12" md="8">


     <b-card 
 block
    >
     <b-row >

    <b-col cols="4">   
     <b-card bg-variant="dark" text-variant="white"  width:>
         <h5 v-if="numero!='date'" class="text-left"> {{dia }}   </h5> 
              <h2 v-if="numero!='date'" class="text-justify"> {{ mes  }}  {{numero}}
              <br>
              <br>
          <div> 
              <h6>Consumo</h6>    <p>{{DiaConsumoKwh}}</p>
              <hr>
              <h6>Demanda</h6>     <p>{{DiaDemandaKwh}}</p>
              <hr>
              <h6>Produccion</h6>     <p>{{ valorMuestra }}</p>   



    <b-row>
    <b-col><b-form-input  v-model="produccion" variant="Primary" ></b-form-input></b-col>
    <b-col><b-button   @click="GuardarValor(produccion,ctx)" variant="light"> <i class="fas fa-save"></i> Guardar</b-button></b-col>
  </b-row>

           


          </div>
                  </h2> 
          <h5 v-if="numero=='date'">Escoja un dia de la semana  </h5> 



  
</b-card>
      
     <!-- <pre class="small">{{context}} </pre> -->
  
 
    </b-col>
    <b-col cols="8">
        <b-calendar 
        hide-header
        :max="max"
        block
        v-model="value"
        v-bind=" {}"
        :locale="locale"
        @context="onContext"
        label-help=""
      ></b-calendar>
     
    </b-col>

  </b-row>
    </b-card>
    </b-col>
  <b-col cols="6" md="4">
              <div  class="w-1" width="2" heigth=""
  >
              <b-card>
              
              <h2 class="text-right"> {{mes}}  </h2> 
              <hr> 

              <p>consumo </p>     {{ EpimpKwh }}    KwH   ${{consumoDinero}}
              <hr>
                <p>demanda </p>  {{DemandaKwh}} KwH    
                    <hr>
                <p>Produccion </p>   <b-input type="number" v-model="Produccion_Mensual"></b-input>

              <br>
              resultado {{Produccion_Mensual}}
              
               </b-card>
               
              
            </div>


 

 
  </b-col>

  <b-col>
            <b-row class="header">
                <div class="filters-container">
                    <b-form-select
                        v-model="metersFilter.selected"
                        :options="metersFilter.options" class="mb-3" />
                </div>
            </b-row>
            <b-row class="list">
                <b-col>
                    <b-card
                        class="margin-bottom-1"
                        v-show="metersFilter.selected !== null">
                        <v-columns :meterId="metersFilter.selected"/>
                    </b-card>
                    <b-alert
                        show
                        variant="info"
                        v-if="metersFilter.selected === null">
                        Selecciona un medidor para desplegar la gráfica.
                    </b-alert>
                </b-col>
            </b-row>
        </b-col>
  </b-row>


  
</template>

<script>

import eficiencia from '@/services/eficiencia';
import meter from '@/services/meters';
import designatedmeters from '@/services/designatedMeters';
import VColumns from '@/app/components/chart/VColumnsEficiencia.vue';

//import eficiencia from '../../services/eficiencia.js';

  export default {
       components: {
        VColumns
    },
    data() {
        const now = new Date()
       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
         const minDate = new Date(today)
      const maxDate = new Date(today)

      return {
        max: maxDate,
        DiaDemandaKwh: '',
        DiaConsumoKwh: '',
        designatedmeter: '',
        metersFilter: {
                selected: "",
                options: []
            },
            eds: [],
        Produccion_Mensual: 0,
          consumoDinero:'',
          selectedYMD: '',
          DemandaKwh : '',
          EpimpKwh: '',
          produccion: '',
          valorMuestra: '',
          numero: '',
          dia:'',
          mes:'',
          anio: '',
          seleccionado: '',
        value: 'Escoge una fecha',
        context: null,
        info: '',
        locale: 'es-US',
        locales: [
          { value: 'en-US', text: 'English US (en-US)' },
          { value: 'de', text: 'German (de)' },
          { value: 'ar-EG', text: 'Arabic Egyptian (ar-EG)' },
          { value: 'zh', text: 'Chinese (zh)' }
        ],
        weekday: 0,
        weekdays: [
          { value: 0, text: 'Sunday' },
          { value: 1, text: 'Monday' },
          { value: 6, text: 'Saturday' }
        ],
      }
    },

       watch: {
        companyId() {
            this.getMeters()
        }
    },

    computed: {
        companyId() {
            return this.$store.state.company_id
        }
    },

    beforeMount() {
          this.getMeters();
designatedmeters
    .get()
    .then(res => {
        res.forEach(designatedmeter => {

            if (designatedmeter.company_id == this.$store.state.user.user.company_id) {
                console.log(designatedmeter.meter_id)
                this.designatedmeter = designatedmeter.meter_id;

                meter
                    .getConsumptionCostsByFilter(
                        designatedmeter.meter_id,
                        '',
                        'Servicio 1',
                        3,
                        3600,
                        {}
                    )
                    .then(respuesta => {
                        console.log(respuesta)
                        var costo_total = []
                        respuesta.forEach(respuestas => {
                            costo_total.push(respuestas.cost);

                        });

                        var Costo_Dispositivo = costo_total
                            .reduce((a, b) => a + b, 0) //Sumando los valores
                            .toFixed(2) //redondearlo a dos punto  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") Mostrarlo de manera bonita

                        this.consumoDinero = Costo_Dispositivo

                    })
                    .catch(err => {

                        console.log(err);
                    });

                        meter
                  .getStandardReadings(designatedmeter.meter_id, '', 'Servicio 1', 'DP', 3, 3600, {})
                              .then(respuesta => {
                                  var kwh = []
                                  respuesta.forEach(respuestas => {
                                      kwh.push(respuestas.value);

                                  });
                                  var kwhTotal = kwh
                                      .reduce((a, b) => a + b, 0) //Sumando los valores
                                      .toFixed(2) //redondearlo a dos punto  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") Mostrarlo de manera bonita

                                  this.DemandaKwh = kwhTotal

                              })
                              .catch(err => {

                                  console.log(err);
                              });



                               meter
                  .getStandardReadings(designatedmeter.meter_id, '', 'Servicio 1', 'EPimp', 3, 3600, {})
                              .then(respuesta => {
                                  var khwConsumo = []
                                  respuesta.forEach(respuestas => {
                                      khwConsumo.push(respuestas.value);

                                  });
                                  var khwConsumoTotal = khwConsumo
                                      .reduce((a, b) => a + b, 0) //Sumando los valores
                                      .toFixed(2) //redondearlo a dos punto  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") Mostrarlo de manera bonita

                                  this.EpimpKwh = String(khwConsumoTotal) + "Kwh"

                              })
                              .catch(err => {

                                  console.log(err);
                              });

                      }

                  }
                  );
                  }
                  ).catch(err => {
                  console.log(err);
                  });


   


  

    },
    methods: {

        getMeters() {
            designatedmeters.find({
                filter: {
                    include: ['services'],
                    where: { company_id: this.companyId }
                }
            }).then(eds => {
                if (!eds[0]) return;
                this.eds = eds[0];
                if (this.eds.services) {
                    this.eds.services.forEach(service => {
                        this.metersFilter.options.push({
                            value:`${this.eds.meter_id}*EDS*${service.serviceName}`,
                            text: service.serviceName
                        });
                    });
                }
                meter.connectedDevices({
                    id: this.eds.id
                }).then(devices => {
                    devices.forEach((device, index) => {
                        // Ignore first device. EDS
                        if (index === 0) return;
                        this.metersFilter.options.push({
                            value:`${this.eds.meter_id}*${device.name}`,
                            text: device.description
                        });
                    });
                    this.metersFilter.selected = this.metersFilter.options[0].value;
                });
            });
        },

      GuardarValor(produccion) {
      eficiencia
          .eficiency()
          .then(res => {
              var id_eficiencia_a_cambiar = 0;
              var bandera = 0
              res.forEach(dia => {
                  if (dia.UserId == this.$store.state.user.user.id && dia.Dia == this.selectedYMD && bandera == 0) {
                      console.log("desde produciendo");
                      this.valorMuestra = produccion;
                      bandera = 1;
                      id_eficiencia_a_cambiar = dia
                          .id
                          eficiencia
                          .guardar(
                              this.$store.state.user.user.id,
                              this.seleccionado,
                              produccion,
                              id_eficiencia_a_cambiar
                          )
                          .then(res => {
                              console.log(res)
                          })
                          .catch(err => {
                              console.log(err);
                          });
                  } else {
                      if (bandera == 1) {} else {
                          this.valorMuestra = 0;
                      }
                  }

              });
              if (bandera == 0) {
                  this.valorMuestra = produccion;
                  eficiencia
                      .guardar(
                          this.$store.state.user.user.id,
                          this.seleccionado,
                          produccion
                      )
                      .then(res => {

                          console.log(res)
                      })
                      .catch(err => {
                          console.log(err);
                      });

              }
          })
          .catch(err => {
              console.log(err);
          });
  },
/*
      console.log(produccion);
//eficiencia.guardar()
 console.log( this.seleccionado);
console.log(this.$store.state.user.user.id);


eficiencia.guardar(this.$store.state.user.user.id,this.seleccionado,produccion).then(res =>{
  console.log(res)
}).
catch(err => {
                    console.log(err);
                });


      },
*/
      
      onContext(ctx) {
        this.context = ctx
        this.info = ctx.selectedFormatted
        
this.seleccionado = ctx.selectedYMD; // guardado en base de datos

if(this.designatedmeter != '')
{
  this.DiaKwhConsumo();
  this.DiaKwhDemanda();
}

 
      var day =  this.info.split(",");
      var month = this.info.split(" ");

this.dia = day[0];
this.numero = month[1];
this.mes = month[3];
this.anio = month[5];
this.selectedYMD = ctx.selectedYMD;

     /* console.log(day[0]) // el verdadero  mier sab etc
      console.log(month[1]) // el numero de dia 
      console.log(month[3]) // el mes 
      console.log(month[5]) // el año */
    

eficiencia
    .eficiency()
    .then(res => {
           var bandera = 0
        res.forEach(dia => {
         
            if (dia.UserId == this.$store.state.user.user.id && dia.Dia == ctx.selectedYMD) {
                this.valorMuestra = dia.valor;
                bandera = 1;
            } else {
                if (bandera == 1) {} else {
                    this.valorMuestra = 0;
                }
            }

        });
     }).catch(err => {
                    console.log(err);
                });
      },
      DiaKwhConsumo(){

        meter.getStandardReadings(this.designatedmeter, '', 'Servicio 1', 'EPimp', -1, 3600, {from: this.seleccionado , until: this.seleccionado })
                              .then(respuesta => {
                              var  khwConsumoDia = [];
                                   respuesta.forEach(respuestas => {
                                      khwConsumoDia.push(respuestas.value);

                                  });
                                      var khwConsumoTotalDia = khwConsumoDia
                                      .reduce((a, b) => a + b, 0) //Sumando los valores
                                      .toFixed(2) //redondearlo a dos punto  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") Mostrarlo de manera bonita


                                   this.DiaConsumoKwh = String(khwConsumoTotalDia) + " Kwh"; 
                              })
                              .catch(err => {

                                  console.log(err);
                              });
      },

      DiaKwhDemanda(){

        meter.getStandardReadings(this.designatedmeter, '', 'Servicio 1', 'DP', -1, 3600, {from: this.seleccionado , until: this.seleccionado })
                              .then(respuesta => {
                              var  khwConsumoDia = [];
                                   respuesta.forEach(respuestas => {
                                      khwConsumoDia.push(respuestas.value);

                                  });
                                      var khwConsumoTotalDia = khwConsumoDia
                                      .reduce((a, b) => a + b, 0) //Sumando los valores
                                      .toFixed(2) //redondearlo a dos punto  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") Mostrarlo de manera bonita


                                   this.DiaDemandaKwh =   String(khwConsumoTotalDia) + " Kwh"; 
                              })
                              .catch(err => {

                                  console.log(err);
                              });

      }

    }
  }
</script>