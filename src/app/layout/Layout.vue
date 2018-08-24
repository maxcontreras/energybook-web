<template>
    <div id="app-layout">
        <div id="side-nav" class="menu d-none d-sm-block d-xs-block">
            <div class="nav-logo-container">
                <img src="/assets/logo1.png" />
            </div>
            <b-nav vertical class="w-100">
                <b-nav-item v-bind:class="{'current-view': currentView === 'dashboard'}" @click="goTo('dashboard')">
                    <div class="menu-icon-container"><i class="fas fa-tachometer-alt"></i></div>Dashboard</b-nav-item>
                <b-nav-item v-if="isAdmin" v-bind:class="{'current-view': currentView === 'companies' || currentView === 'companyDetail' || currentView === 'companyProfile'}" @click="goTo('companies')">
                    <div class="menu-icon-container"><i class="far fa-building"></i></div> Compañías
                </b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'meters'}" @click="goTo('meters')">
                    <div class="menu-icon-container"><i class="fas fa-solar-panel"></i></div> Medidores
                </b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'payments'}" @click="goTo('payments')" v-if="isAdmin">
                    <div class="menu-icon-container"><i class="fas fa-dollar-sign"></i></div> Pagos
                </b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'calendar'}" @click="goTo('calendar')" v-if="isManager || isAccounting">
                    <div class="menu-icon-container"><i class="far fa-calendar-alt"></i></div> Eficiencia
                </b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'graphs'}" @click="goTo('graphs')" v-if="!isAdmin">
                    <div class="menu-icon-container"><i class="fas fa-chart-line"></i></div> Gráficas
                </b-nav-item>
                <b-nav-item v-if="isManager" v-bind:class="{'current-view': currentView === 'payments'}" @click="goTo('payments')">
                   <div class="menu-icon-container"> <i class="fas fa-dollar-sign"></i></div> Facturación
                </b-nav-item>
                <b-nav-item v-if="!isAdmin" v-bind:class="{'current-view': currentView === 'costs'}" @click="goTo('costs')">
                   <div class="menu-icon-container"> <i class="fas fa-coins"></i></div> Costos
                </b-nav-item>
                <b-nav-item v-if="!isAccounting" v-bind:class="{'current-view': currentView === 'profile'}" @click="goTo('profile')">
                    <div class="menu-icon-container"><i class="far fa-user"></i></div> Perfil
                </b-nav-item>
                <!--<b-nav-item @click="logout()">
                    <div class="menu-icon-container"><i class="fas fa-sign-out-alt"></i></div> Cerrar Sesión
                </b-nav-item>-->
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
            <b-navbar :sticky="true" type="light" variant="light" toggleable>
                <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                <b-collapse is-nav id="nav_dropdown_collapse">
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item id="notification-link">
                            <i class="far fa-bell" @click="toggleNotificationPanel()"></i>
                            <Notification/>
                        </b-nav-item>
                        <b-nav-item-dropdown :text="user.user.name + ' ' + user.user.lastname" right>
                        <b-dropdown-item @click="logout()">Cerrar Sesión</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

//cambiar nombre de archivos de acuerdo a las secciones

import Notification from '@/app/components/notificationPanel/NotificationPanel.vue';

export default {
    components: {
        Notification
    },
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
        },
        user() {
            return this.$store.state.user;
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
            this.$store.dispatch('user/logout');
        },
        toggleNotificationPanel() {
            this.toggle = !this.toggle;
            let $dropdown = $('#notification');

            if(this.toggle) {

                $dropdown.stop().css({
                    'display': 'block',
                    'top': 20,
                    'opacity': 0
                }).animate({
                    top:  35,
                    opacity: 1
                }, 300);
            } else {
                $dropdown.css({ 'display' : 'none'});
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../styles/menu.scss';
</style>