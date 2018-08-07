<template>
    <div id="app-layout">
        <div id="side-nav" class="menu d-none d-sm-block d-xs-block">
            <b-nav vertical class="w-100">
                <b-nav-item v-bind:class="{'current-view': currentView === 'dashboard'}" @click="goTo('dashboard')">
                    <div class="menu-icon-container"><i class="fas fa-chart-line"></i></div>Dashboard</b-nav-item>
                <b-nav-item v-if="isAdmin" v-bind:class="{'current-view': currentView === 'companies'}" @click="goTo('companies')">
                    <div class="menu-icon-container"><i class="far fa-building"></i></div> Compañías
                </b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'meters'}" @click="goTo('meters')">
                    <div class="menu-icon-container"><i class="fas fa-solar-panel"></i></div> Medidores
                </b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'payments'}" @click="goTo('payments')" v-if="isAdmin">
                    <div class="menu-icon-container"><i class="fas fa-dollar-sign"></i></div> Pagos
                </b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'calendar'}" @click="goTo('calendar')" v-if="isManager || isAccounting">
                    <div class="menu-icon-container"><i class="far fa-calendar-alt"></i></div> Calendario
                </b-nav-item>
                <b-nav-item v-if="isManager" v-bind:class="{'current-view': currentView === 'payments'}" @click="goTo('payments')">
                   <div class="menu-icon-container"> <i class="fas fa-dollar-sign"></i></div> Facturación
                </b-nav-item>
                <b-nav-item>
                    <div class="menu-icon-container"><i class="far fa-bell"></i></div> Notificaciones
                </b-nav-item>
                <b-nav-item v-if="!isAccounting" v-bind:class="{'current-view': currentView === 'profile'}" @click="goTo('profile')">
                    <div class="menu-icon-container"><i class="far fa-user"></i></div> Perfil
                </b-nav-item>
                <b-nav-item @click="logout()">
                    <div class="menu-icon-container"><i class="fas fa-sign-out-alt"></i></div> Cerrar Sesión
                </b-nav-item>
            </b-nav>
        </div>
        <div id="top-nav" class="menu d-md-none d-lg-none .d-xl-none mobile">
            <b-nav class="w-100">
                <b-nav-item v-bind:class="{'current-view': currentView === 'dashboard'}" @click="goTo('dashboard')">
                    <i class="fas fa-chart-line"></i>
                </b-nav-item>
                <b-nav-item>
                    <i class="far fa-file-alt"></i>
                </b-nav-item>
                <b-nav-item>
                    <i class="far fa-bell"></i>
                </b-nav-item>
                <b-nav-item>
                    <i class="fas fa-coins"></i>
                </b-nav-item>
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