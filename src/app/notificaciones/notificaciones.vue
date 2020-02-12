<template>
  
  <div>

      hola
  </div>
</template>

<script>
    /* eslint-disable */
    import designatedMeters from '@/services/designatedMeters';
    import meters from '@/services/meters';
    import VColumns from '@/app/components/chart/VColumns.vue';
    import notificaciones from '@/services/notificaciones';

    export default {
        components: {
        },

        data() {
            return {
                nuevas: null,
                viejas: []
            }
        },
created() {

       this.fetchnotificaciones ()



},

        watch: {},

        computed: {
            notificacion(){
                return this.$store.state.notificacion
            },
            companyId() {
                return this.$store.state.company_id
            }
        },

        methods: { 
            fetchnotificaciones() {
    var Company_ID = JSON
        .parse(localStorage.getItem('user'))
        .company_id;
    var User_id = JSON
        .parse(localStorage.getItem('user'))
        .id;
    notificaciones
        .verNotificaciones(User_id, Company_ID)
        .then(notificaciones => {
            console.log(notificaciones.Resultado[0])
            console.log(notificaciones.Resultado[1])
            this.nuevas= notificaciones.Resultado[0]
            this.viejas= notificaciones.Resultado[1]
          
        })
}}
    }
</script>