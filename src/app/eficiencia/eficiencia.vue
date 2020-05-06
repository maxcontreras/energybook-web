<template>
  <b-row>


    <b-col cols="12" md="8">


     <b-card 
 block
    >
     <b-row >

    <b-col cols="4">   
     <b-card bg-variant="dark" text-variant="white"  width:>
         <h5 v-if="numero!=''" class="text-left"> {{dia }}   </h5> 
              <h2 v-if="numero!=''" class="text-justify"> {{ mes  }}  {{numero}}
              <br>
              <br>
          <div> 
                          <div class="d-flex justify-content-around">
              <p style="font-size: 17px;">Consumo</p>      <p style="font-size: 17px;">{{DiaConsumoKwh}}</p> 
            </div>
               
              <hr>          
              <div class="d-flex justify-content-around">
               <p style="font-size: 17px;">Demanda</p>       <p style="font-size: 17px;">{{DiaDemandaKwh}}</p>
            </div>
              
              <hr>
                <div class="d-flex justify-content-around">
               <p style="font-size: 17px;" >Produccion</p>      <p style="font-size: 17px;">{{ valorMuestra }}</p>   
            </div>
               



    <b-row>
    <b-col><b-form-input  v-model="produccion" variant="Primary" ></b-form-input></b-col>
    <b-col><b-button   @click="GuardarValor(produccion,ctx)" variant="light"> <i class="fas fa-save"></i> Guardar</b-button></b-col>
  </b-row>

           


          </div>
                  </h2> 
          <h5 v-if="numero==''">Cargando ... </h5> 



  
</b-card>
      
     <!-- <pre class="small">{{context}} </pre> -->
  
 
    </b-col>
    <b-col cols="8">
       <date-picker
                        placeholder="Desde"
                        v-model="date_custom"
                      @dp-change="setCustomDate"
                        :config="dateConfig"
                      >  </date-picker>
     
    </b-col>

  </b-row>
    </b-card>
    </b-col>



  <b-col cols="6" md="4">
              <div  class="w-1" width="2" heigth=""
  >
              <b-card>
              
              <h2 class="text-right"> {{mes}} </h2> 
              <hr> 

                   <div class="d-flex justify-content-around">
              <p>Consumo </p>     <p>{{ EpimpKwh }}  </p>     <p>${{consumoDinero}}</p>
            </div>


           
              <hr>

                      <div class="d-flex justify-content-around">
               <p>Demanda </p>  <p>{{DemandaKwh}} </p>  <p>&nbsp; </p>
            </div>


           
                    <hr>

                          <div class="d-flex justify-content-around">
               <p>Produccion Mensual</p>    <p> {{ProduccionDelMes}} </p>    <p>&nbsp; </p>
            </div>
            <hr>
                      <div class="d-flex justify-content-around">
  <p>   {{resultado1}}</p>
                    </div>
              
              
             
                <br v-if="DisplayFormula!=''">
                    <div class="d-flex justify-content-around">
  {{DisplayFormula2}} 
                    </div>
         
              
                



              <br>
           

              
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
                        <v-columns fecha="2020-03-13"  :meterId="metersFilter.selected"/>
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

import datePicker from 'vue-bootstrap-datetimepicker';
import { parseDate, parseDateTime, parseDayName, parseMonth } from '@/utils/dateTime';

import eficiencia from '@/services/eficiencia';
import meter from '@/services/meters';
import designatedmeters from '@/services/designatedMeters';
import VColumns from '@/app/components/chart/VColumnsEficiencia.vue';

//import eficiencia from '../../services/eficiencia.js';

  export default {
       components: {
        VColumns,
        datePicker
    },
    data() {
        const now = new Date()
       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
         const minDate = new Date(today)
      const maxDate = new Date(today)

      return {
          DisplayFormula2: '',
          fecha: '',
          ProduccionDelMes: '',

          today: today,
          resultado1: '',

        max: maxDate,
        DiaDemandaKwh: '',
        DiaConsumoKwh: '',
          date_custom: '',
      dateConfig: {
          maxDate: maxDate,
          inline: true,
        format: "YYYY-MM-DD",
        useCurrent: false
      },
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
           designatedmeter: function(val, oldval){
 var m = new Date();
var dateString =
    m.getFullYear() + "-" +
    ("0" + (m.getMonth()+1)).slice(-2) + "-" +
    ("0" + (m.getDate()-1)).slice(-2) 
this.date_custom = dateString

this.setCustomDate();

   

           },

           consumoDinero: function (val, oldVal){

           var monthcostCpacidad =  this.capacityMonthCost;  // Capacidad
            var  distributionMonthCost = this.distributionMonthCost // month costo
            var Consumodinero = this.consumoDinero
          var convertidoconsumo =  parseInt(Consumodinero); // convirtiendo a int 
    

            var total =  convertidoconsumo + distributionMonthCost + monthcostCpacidad; // sumando 

            var formula2 = total / this.ProduccionDelMes

            this.DisplayFormula2 = formula2.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $/Unidad"

           },


        companyId() {
            this.getMeters()
        }
    },

    computed: {
        distributionMonth() {
            let prettyDistribution = this.prettifyNumbers(this.$store.state.socket.distributionMonth);
            return parseFloat(prettyDistribution);
        },

        distributionMonthCost() {
            return (this.cfePrices.distributionPrice * parseFloat(this.distributionMonth));
        },
                capacityMonth() {
            return this.$store.state.socket.capacityMonth;
        },

        capacityMonthCost() {
            return (this.cfePrices.capacityPrice * parseFloat(this.capacityMonth));
        },

        cfePrices() {
            return this.$store.getters['meter/getCfePrices'];
        },
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



                      }

                  }
                  );
                  }
                  ).catch(err => {
                  console.log(err);
                  });


  

    },
    methods: {
                    prettifyNumbers(number){
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

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
                      this.valorMuestra = produccion;
                      bandera = 1;
                      id_eficiencia_a_cambiar = dia
                          .id
                          eficiencia
                          .guardar(
                              this.$store.state.user.user.id,
                              this.selectedYMD,
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
                          this.selectedYMD,
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
Cleaning(){
     this.DiaConsumoKwh = ""; 
     this.DiaDemandaKwh = '';
      this.DiaConsumoKwh = '';

},
  diseño(){
    
 
      
      var fechaseleccionada = new Date(this.fecha[0],this.fecha[1]-1,this.fecha[2]); 
      var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      var dias = new Array("domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado")

      this.dia = dias[fechaseleccionada.getDay()]
      this.mes = meses[fechaseleccionada.getMonth()]
      this.numero = fechaseleccionada.getDate()
  },
      setCustomDate() {
          this.Cleaning();
          console.log(this.date_custom)
        this.selectedYMD = this.date_custom;
      
     
      

         this.fecha = this.selectedYMD.split("-");
           this.diseño();
      



        eficiencia
    .eficiency()
    .then(res => {
           var bandera = 0
        res.forEach(dia => {
         
            if (dia.UserId == this.$store.state.user.user.id && dia.Dia == this.selectedYMD) {
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
        //Consumo por dia en KWH
         this.DiaKwhConsumo();
         //Consumo por dia en DEMANDA
           this.DiaKwhDemanda();
           // CHIALE 
           this.produccionMensual();
           // producciones mensuales aber
           this.ValoresMensuales();
        // Calculando las unidades 






      },
      calculos(){
 

      },
      ValoresMensuales(){
        
                            var inicio = this.fecha[0] + "-"+ this.fecha[1] + "-01"
                            var Comparador = this.fecha[0] + "-"+ this.fecha[1] + "-30"
                            var seleccionado = this.selectedYMD

                            var iniciando = new Date(inicio) // inicio de mes
                            var predefinido  =new Date(Comparador) // Final de mes
                            var seleccionador = new Date(seleccionado) // seleccionado 

 var m = new Date();
var dateString =
    m.getUTCFullYear() + "-" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
    ("0" + m.getUTCDate()).slice(-2) 


   var meshoy =  ("0" + (m.getUTCMonth()+1)).slice(-2);
   var messeleccionado = this.fecha[1];



                            if(seleccionador < m && parseInt(meshoy)!= parseInt(messeleccionado) ){
                                  meter
                    .getConsumptionCostsByFilter(
                        this.designatedmeter,
                        '',
                        'Servicio 1',
                        -1,
                        3600,
                        {from: inicio, until: Comparador}
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
                  .getStandardReadings(this.designatedmeter, '', 'Servicio 1', 'DP', -1, 3600,   {from: inicio, until: Comparador})
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
                  .getStandardReadings(this.designatedmeter, '', 'Servicio 1', 'EPimp', -1, 3600,   {from: inicio, until: Comparador})
                              .then(respuesta => {
                                  var khwConsumo = []
                                  respuesta.forEach(respuestas => {
                                      khwConsumo.push(respuestas.value);

                                  });
                                  var khwConsumoTotal = khwConsumo
                                      .reduce((a, b) => a + b, 0) //Sumando los valores
                                      .toFixed(2) //redondearlo a dos punto  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") Mostrarlo de manera bonita

                                  this.EpimpKwh = String(khwConsumoTotal) + " kWh"

                              })
                              .catch(err => {
                             console.log(err);
                              });
                        

                                
                            }else{
                    
                                     meter
                    .getConsumptionCostsByFilter(
                        this.designatedmeter,
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
                  .getStandardReadings(this.designatedmeter, '', 'Servicio 1', 'DP', 3, 3600,   {})
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
                  .getStandardReadings(this.designatedmeter, '', 'Servicio 1', 'EPimp', 3, 3600,   {})
                              .then(respuesta => {
                                  var khwConsumo = []
                                  respuesta.forEach(respuestas => {
                                      khwConsumo.push(respuestas.value);

                                  });
                                  var khwConsumoTotal = khwConsumo
                                      .reduce((a, b) => a + b, 0) //Sumando los valores
                                      .toFixed(2) //redondearlo a dos punto  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") Mostrarlo de manera bonita

                                  this.EpimpKwh = String(khwConsumoTotal) + "Kwh"

                                  this.resultado1 = khwConsumoTotal / parseInt(this.ProduccionDelMes) + " kWh/unidad"
                                

                              })
                              .catch(err => {

                                  console.log(err);
                              });


                            }

                          

              
                     


      },
      DiaKwhConsumo(){
          console.log(this.designatedmeter)

        meter.getStandardReadings(this.designatedmeter, '', 'Servicio 1', 'EPimp', -1, 3600, {from: this.date_custom , until: this.date_custom })
                              .then(respuesta => {
                              var  khwConsumoDia = [];
                                   respuesta.forEach(respuestas => {
                                      khwConsumoDia.push(respuestas.value);

                                  });
                                      var khwConsumoTotalDia = khwConsumoDia
                                      .reduce((a, b) => a + b, 0) //Sumando los valores
                                      .toFixed(2) //redondearlo a dos punto  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") Mostrarlo de manera bonita


                                   this.DiaConsumoKwh = String(khwConsumoTotalDia) + " kWh"; 
                              })
                              .catch(err => {

                                  console.log(err);
                              });
      },

      produccionMensual(){
          eficiencia.ProduccionMes(this.$store.state.user.user.id, this.selectedYMD ).then(res=>{
        
            this.ProduccionDelMes = res["Resultado"];

          }).catch(err=>{
               console.log(err)
          })

      },

      DiaKwhDemanda(){

        meter.getStandardReadings(this.designatedmeter, '', 'Servicio 1', 'DP', -1, 3600, {from: this.date_custom , until: this.date_custom })
                              .then(respuesta => {
                              var  khwConsumoDia = [];
                                   respuesta.forEach(respuestas => {
                                      khwConsumoDia.push(respuestas.value);

                                  });
                                      var khwConsumoTotalDia = khwConsumoDia
                                      .reduce((a, b) => a + b, 0) //Sumando los valores
                                      .toFixed(2) //redondearlo a dos punto  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") Mostrarlo de manera bonita


                                   this.DiaDemandaKwh =   String(khwConsumoTotalDia) + " kWh"; 
                              })
                              .catch(err => {

                                  console.log(err);
                              });

      }

    }
  }
</script>