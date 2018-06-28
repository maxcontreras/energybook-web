<template>
  <div id="app-layout">
        <div id="side-nav" class="menu d-none d-sm-block d-xs-block">
			<b-nav vertical class="w-100">
                <b-nav-item><i class="fas fa-coins"></i>27 de julio</b-nav-item>
				<b-nav-item v-bind:class="{'current-view': currentView === 'dashboard'}" @click="goTo('dashboard')"><i class="fas fa-chart-line"></i>Análisis</b-nav-item>
				<b-nav-item v-bind:class="{'current-view': currentView === 'clients'}" @click="goTo('clients')"><i class="fas fa-chart-line"></i>Clientes</b-nav-item>
                <b-nav-item><i class="far fa-file-alt"></i>Reportes</b-nav-item>
				<b-nav-item><i class="far fa-bell"></i>Alarmas</b-nav-item>
				<b-nav-item><i class="fas fa-coins"></i>Costos</b-nav-item>
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
        }
    }
}
</script>

<style lang="scss">
@import '../../styles/menu.scss';
</style>