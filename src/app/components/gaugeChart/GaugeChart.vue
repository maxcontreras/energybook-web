<template>
    <div>
        <radial-gauge :value="value" :options="options"></radial-gauge>
    </div>
</template>
 
<script>  
  import RadialGauge from 'vue-canvas-gauges/src/RadialGauge'
 
  export default {
    components: {
      RadialGauge
    },
    props: {
      value: {
        type: Number,
        default: 50
      },
      title: {
        type: String,
        default: ''
      },
      options: { // https://canvas-gauges.com/documentation/user-guide/configuration
        type: Object,
        default: () => ({
          units: 'kW',
          minValue: 0,
          maxValue: 600,
          width: 230,
          height: 230,
          strokeTicks: false,
          //colorBar: '#4b4b4b',
          colorBar: 'white',
          colorBarProgress: 'white',
          //colorNumbers: 'white',
          highlights: [ {
            'from': 0,
            'to': 350,
            'color': 'green'
          },{
            'from': 351,
            'to': 450,
            'color': 'yellow'
          },{
            'from': 451,
            'to': 600,
            'color': 'red'
          }
          ],
          majorTicks: [
            '0',
            '200',
            '400',
            '600'
          ],
          //colorPlate: '#4b4b4b',
          colorPlace: 'white',
          borderShadowWidth: 0,
          borders: false,
          needleType: 'arrow',
          needleShadow: true,
          needleWidth: 0,
          needleCircleSize: 7,
          needleCircleOuter: true,
          needleCircleInner: false,
          numberSide: 'left',
          needleSide: 'left',
          animationDuration: 1500,
          animationRule: 'bounce',
          barWidth: 15,
          valueBox: true,
          valueBoxStroke: 5,
          valueTextShadow: true,
          valueDec: 1,
          barBeginCircle: 0,
          fontNumbersSize: 28,
          fontUnitsSize: 30,
          fontValueSize: 30
        })
      }
    }
  }
</script>