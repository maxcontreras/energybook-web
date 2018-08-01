<template>
  <div id="app-layout">
        <div id="side-nav" class="menu d-none d-sm-block d-xs-block">
			<b-nav vertical class="w-100">
				<b-nav-item v-bind:class="{'current-view': currentView === 'dashboard'}" @click="goTo('dashboard')" v-b-tooltip.hover.right="'Reportes'"><i class="fas fa-chart-line"></i></b-nav-item>
				<b-nav-item v-if="isAdmin" v-bind:class="{'current-view': currentView === 'companies'}" @click="goTo('companies')" v-b-tooltip.hover.right="'Compañías'"><i class="far fa-building"></i></b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'meters'}" @click="goTo('meters')" v-b-tooltip.hover.right="'Medidores'"><i class="fas fa-solar-panel"></i></b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'payments'}" @click="goTo('payments')" v-if="isAdmin" v-b-tooltip.hover.right="'Pagos'"><i class="fas fa-dollar-sign"></i></b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'analysis'}" @click="goTo('analysis')" v-if="isAdmin" v-b-tooltip.hover.right="'Análisis'"><i class="far fa-file-alt"></i></b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'calendar'}" @click="goTo('calendar')" v-if="isManager || isAccounting" v-b-tooltip.hover.right="'Calendario'"><i class="far fa-calendar-alt"></i></b-nav-item>
                <b-nav-item v-if="isManager" v-b-tooltip.hover.right="'Facturación'"><i class="fas fa-dollar-sign"></i></b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'myCompany'}" @click="goTo('myCompany')" v-if="isAccounting" v-b-tooltip.hover.right="'Mi compañía'"><i class="fas fa-users"></i></b-nav-item>
                <b-nav-item v-b-tooltip.hover.right="'Notificaciones'"><i class="far fa-bell"></i></b-nav-item>
                <b-nav-item v-if="!isAccounting" v-b-tooltip.hover.right="'Perfil'"><i class="far fa-user"></i></b-nav-item>
                <b-nav-item v-b-tooltip.hover.right="'Cerrar Sesión'" @click="logout()"><i class="fas fa-sign-out-alt"></i></b-nav-item>
			</b-nav>
		</div>
		<div id="top-nav" class="menu d-md-none d-lg-none .d-xl-none mobile">
			<b-nav class="w-100">
				<b-nav-item v-bind:class="{'current-view': currentView === 'dashboard'}" @click="goTo('dashboard')"><i class="fas fa-chart-line"></i></b-nav-item>
				<b-nav-item><i class="far fa-file-alt"></i></b-nav-item>
				<b-nav-item><i class="far fa-bell"></i></b-nav-item>
				<b-nav-item><i class="fas fa-coins"></i></b-nav-item>
			</b-nav>
		</div>
		<div id="main">
			<router-view></router-view>
		</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            currentView: this.$store.state.currentView,
			toggle: false
        }
    },

    computed: {
        isAdmin() {
            return this.$store.state.isAdmin;
        },
        isUser() {
            return this.$store.state.isUser;
        },
        isManager() {
            return this.$store.state.isManager;
        },
        isAccounting() {
            return this.$store.state.isAccounting;
        }
    }, 

    created() {
        this.$store.watch(
            () => {
                return this.$store.state.currentView;
            },
            newState => {
                this.currentView = newState;
            }
        );
    },

    methods: {
        goTo(route) {
            this.$router.push({name: route});
        },
        logout() {
            console.log("logut");
            this.$store.dispatch('user/logout');
        }
    }
}
</script>

<style lang="scss">
@import '../../styles/menu.scss';
</style>