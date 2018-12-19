<template>
    <div id="app-layout">
        <div id="side-nav" class="menu d-none d-sm-block d-xs-block">
            <div class="nav-logo-container">
                <img src="/assets/logo.png" />
            </div>
            <b-nav vertical class="w-100">
                <b-nav-item v-bind:class="{'current-view': currentView === 'dashboard'}" @click="goTo('dashboard')">
                    <div class="menu-icon-container"><i class="fas fa-tachometer-alt"></i></div>Dashboard</b-nav-item>
                <b-nav-item class="meters-submenu" v-if="false" @click="goToMeter(meter.meter_id)" v-for="meter in meters" :key="meter.id">
                    <div class="menu-icon-container"></div>{{meter.device_name}}</b-nav-item>
                <b-nav-item v-if="isAdmin" v-bind:class="{'current-view': currentView === 'companies' || currentView === 'companyDetail' || currentView === 'companyProfile'}" @click="goTo('companies')">
                    <div class="menu-icon-container"><i class="far fa-building"></i></div> Compañías
                </b-nav-item>
                <b-nav-item v-if="!isUser" v-bind:class="{'current-view': currentView === 'meters'}" @click="goTo('meters')">
                    <div class="menu-icon-container"><i class="fas fa-solar-panel"></i></div> Medidores
                </b-nav-item>
                <b-nav-item v-if="isUser" v-bind:class="{'current-view': currentView === 'userCosts'}" @click="goTo('userCosts')">
                    <div class="menu-icon-container"><i class="fas fa-coins"></i></div> Costos
                </b-nav-item>
                <b-nav-item v-if="isUser" v-bind:class="{'current-view': currentView === 'netCode'}" @click="goTo('netCode')">
                    <div class="menu-icon-container"><i class="fas fa-gavel"></i></div> Código de red
                </b-nav-item>
                <b-nav-item v-if="isUser" v-bind:class="{'current-view': currentView === 'carbonFootprint'}" @click="goTo('carbonFootprint')">
                    <div class="menu-icon-container"><i class="fas fa-shoe-prints"></i></div> Huella de carbono
                </b-nav-item>
                <!-- TODO Make payments section
                <b-nav-item v-bind:class="{'current-view': currentView === 'payments'}" @click="goTo('payments')" v-if="isAdmin">
                    <div class="menu-icon-container"><i class="fas fa-dollar-sign"></i></div> Pagos
                </b-nav-item>-->
                <!--<b-nav-item v-bind:class="{'current-view': currentView === 'calendar'}" @click="goTo('calendar')" v-if="isManager || isAccounting">
                    <div class="menu-icon-container"><i class="far fa-calendar-alt"></i></div> Eficiencia
                </b-nav-item>-->
                <b-nav-item v-bind:class="{'current-view': currentView === 'graphs'}" @click="goTo('graphs')" v-if="!isAdmin">
                    <div class="menu-icon-container"><i class="fas fa-chart-line"></i></div> Gráficas
                </b-nav-item>
                <b-nav-item v-if="isManager" v-bind:class="{'current-view': currentView === 'payments'}" @click="goTo('payments')">
                   <div class="menu-icon-container"> <i class="fas fa-dollar-sign"></i></div> Facturación
                </b-nav-item>
                <!--<b-nav-item v-if="!isAdmin" v-bind:class="{'current-view': currentView === 'costs'}" @click="goTo('costs')">
                   <div class="menu-icon-container"> <i class="fas fa-coins"></i></div> Costos
                </b-nav-item>-->
            </b-nav>
        </div>
        <!--<div id="top-nav" class="menu d-md-none d-lg-none .d-xl-none mobile" v-if="false">
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
        </div>-->
        <div id="main">
            <b-navbar id="top-bar" :sticky="true" type="light" variant="light" toggleable>
                <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                <b-col md="4">
                    <v-weather
                        :lat="position.lat"
                        :lon="position.lon"/>
                </b-col>
                <b-col md="3">
                    {{date}}
                </b-col>
                <b-collapse is-nav id="nav_dropdown_collapse">
                    <b-navbar-nav class="ml-auto">
                        <!--<b-nav-item id="notification-link">
                            <i class="far fa-bell" @click="toggleNotificationPanel()"></i>
                            <Notification/>
                        </b-nav-item>-->
                        <b-nav-item-dropdown :text="user.user.name + ' ' + user.user.lastname" right>
                            <b-dropdown-item 
                                v-if="!isAccounting"
                                @click="goTo('profile')">
                                <i class="far fa-user"></i>    Perfil
                            </b-dropdown-item>
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

import Notification from '@/app/components/notificationPanel/NotificationPanel.vue';
import designatedMeters from '@/services/designatedMeters';
import VWeather from '@/app/components/Weather/VWeather.vue';

export default {
    components: {
        Notification,
        VWeather
    },
    data() {
        return {
            currentView: this.$store.state.currentView,
			toggle: false,
            meters: [],
            date: moment().format('LLL'),
            position: {
                lat: 20.659698,
                lon: -103.349609
            }
        }
    },

    computed: {
        isAdmin() {
            return JSON.parse(localStorage.getItem('user')).role_id === 1;
        },
        isUser() {
            return JSON.parse(localStorage.getItem('user')).role_id === 2;
        },
        isManager() {
            return JSON.parse(localStorage.getItem('user')).role_id === 3;
        },
        isAccounting() {
            return JSON.parse(localStorage.getItem('user')).role_id === 4;
        },
        user() {
            return this.$store.state.user.user? this.$store.state.user : {user: {name: '', lastname: ''}};
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

    beforeMount() {
        this.getMeters();
    },

    mounted() {
        setInterval(() => {
            this.date = moment().format('LLL');
        }, 1000);
        navigator.geolocation.getCurrentPosition( position => {
                this.lon = position.coords.longitude,
                this.lat = position.coords.latitude
            },
            function (error) {
                console.log(error.message);
            }, {
                enableHighAccuracy: true
            }
        );
    },

    methods: {
        goTo(route) {
            this.$router.push({name: route});
        },
        goToMeter(meter_id) {
            this.$router.push({name: 'dashboardMeter', params: {id: meter_id}});
        },
        logout() {
            this.$store.dispatch('user/logout');
        },
        toggleMeters() {
            //$('.meters-submenu').toggle();
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
        },
        getMeters() {
            let companyId = JSON.parse(localStorage.getItem('user')).company_id;
            designatedMeters.find({
                filter: {
                    where: {
                        company_id: companyId
                    }
                }
            }).then(designatedMeters => {
                this.meters = designatedMeters;
            });
        }
    }
}
</script>

<style lang="scss">
@import '../../styles/menu.scss';
</style>
