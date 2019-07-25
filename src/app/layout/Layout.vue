<template>
    <div id="app-layout">
        <div id="side-nav" class="menu d-none d-sm-block d-xs-block">
            <div class="nav-logo-container">
                <img src="/assets/logo.png" />
            </div>
            <b-nav vertical class="w-100">
                <b-nav-item
                    v-if="isAdmin"
                    v-bind:class="{'current-view': currentView === 'dashboard'}" @click="goTo('dashboard')">
                    <div class="menu-icon-container"><i class="fas fa-tachometer-alt"></i></div>Dashboard
                </b-nav-item>
                <div v-else>
                    <b-nav-item
                        v-b-toggle.serviceSelection
                        v-bind:class="{'current-view': currentView === 'dashboard'}"
                        @click="toggleShowCollapse">
                        <div class="menu-icon-container"><i class="fas fa-tachometer-alt"></i></div>Dashboard
                    </b-nav-item>
                    <b-collapse
                        id="serviceSelection"
                        v-if="showCollapse">
                        <b-nav-item
                            v-for="(service, index) in services"
                            :key="index"
                            :class="{'currentService': selectedService === service}"
                            @click="changeSelectedService(service)">
                            {{service}}
                        </b-nav-item>
                    </b-collapse>
                </div>

                <b-nav-item v-if="isAdmin" v-bind:class="{'current-view': currentView === 'companies' || currentView === 'companyDetail' || currentView === 'companyProfile'}" @click="goTo('companies')">
                    <div class="menu-icon-container"><i class="far fa-building"></i></div> Compañías
                </b-nav-item>
                <b-nav-item v-if="!isUser" v-bind:class="{'current-view': currentView === 'meters'}" @click="goTo('meters')">
                    <div class="menu-icon-container"><i class="fas fa-solar-panel"></i></div> Medidores
                </b-nav-item>
                <b-nav-item v-if="isAdmin" v-bind:class="{'current-view': currentView === 'cfeValues'}" @click="goTo('cfeValues')">
                    <div class="menu-icon-container"><i class="fas fa-bolt"></i></div> CFE
                </b-nav-item>
                <b-nav-item v-if="!isAdmin" v-bind:class="{'current-view': currentView === 'graphs'}" @click="goTo('graphs')">
                    <div class="menu-icon-container"><i class="fas fa-chart-line"></i></div> Gráficas
                </b-nav-item>
                <b-nav-item v-if="isUser" v-bind:class="{'current-view': currentView === 'userCosts'}" @click="goTo('userCosts')">
                    <div class="menu-icon-container"><i class="fas fa-coins"></i></div> Costos
                </b-nav-item>
                <b-nav-item v-if="isUser" v-bind:class="{'current-view': currentView === 'netCode'}" @click="goTo('netCode')">
                    <div class="menu-icon-container"><i class="fas fa-gavel"></i></div> Código de red
                </b-nav-item>
                <b-nav-item v-if="isUser" v-bind:class="{'current-view': currentView === 'history'}" @click="goTo('history')">
                    <div class="menu-icon-container"><i class="fas fa-history"></i></div> Historial
                </b-nav-item>
                <b-nav-item v-if="isUser" v-bind:class="{'current-view': currentView === 'carbonFootprint'}" @click="goTo('carbonFootprint')">
                    <div class="menu-icon-container"><i class="fas fa-shoe-prints"></i></div> Huella de carbono
                </b-nav-item>
                <b-nav-item v-if="isManager" v-bind:class="{'current-view': currentView === 'payments'}" @click="goTo('payments')">
                   <div class="menu-icon-container"> <i class="fas fa-dollar-sign"></i></div> Facturación
                </b-nav-item>
                <b-nav-item v-if="isAdmin" v-bind:class="{'current-view': currentView === 'customize'}" @click="goTo('customize')">
                    <div class="menu-icon-container"><i class="fas fa-cogs"></i></div> Personalizar
                </b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'generation'}" @click="goTo('generation')" v-if="isUser">
                    <div class="menu-icon-container"><i class="fas fa-bolt"></i></div> Generación
                </b-nav-item>
                <b-nav-item v-bind:class="{'current-view': currentView === 'information'}" @click="goTo('information')" v-if="isUser">
                    <div class="menu-icon-container"><i class="fas fa-info-circle"></i></div> Información
                </b-nav-item>
            </b-nav>
        </div>
        <div id="main">
            <b-navbar id="top-bar" :sticky="true" type="light" variant="light" :toggleable="false">
                <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                <b-col
                    xl="4"
                    md="6">
                    <v-weather
                        :lat="(position)? position.lat: 0"
                        :lon="(position)? position.lon: 0"/>
                </b-col>
                <b-col
                    xl="8"
                    md="6"
                    class="text-right">
                    <template v-if="user.user.free_trial">
                        <p class="trial-days-remaining">{{getTrialDaysLeft()}}{{trialDaysLeft}} días restantes de prueba </p>
                    </template>
                    <img
                        v-show="!meterAvailable"
                        v-b-tooltip.hover title="Medidor no disponible"
                        class="meter-not-available-img"
                        src="/assets/images/conection-error.svg"
                        alt="Medidor no disponible">
                    <p class="current-date">{{date}}</p>
                    <Notification></Notification>
                    <b-collapse
                        is-nav
                        id="nav_dropdown_collapse"
                        class="menu-dropdown">
                        <b-navbar-nav>
                            <b-nav-item-dropdown
                                :text="user.user.name + ' ' + user.user.lastname"
                                right>
                                <b-dropdown-item 
                                    v-if="!isAccounting"
                                    @click="goTo('profile')">
                                    <i class="far fa-user"></i> Perfil
                                </b-dropdown-item>
                                <b-dropdown-item @click="goTo('settings')">
                                    <i class="fas fa-cog"></i> Configuración
                                </b-dropdown-item>
                                <b-dropdown-item @click="logout()">
                                    <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                                </b-dropdown-item>
                            </b-nav-item-dropdown>
                        </b-navbar-nav>
                    </b-collapse>
                </b-col>
                
            </b-navbar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import Notification from '@/app/components/notificationPanel/NotificationPanel.vue';
import designatedMeters from '@/services/designatedMeters';
import eUsers from '@/services/eUsers';
import VWeather from '@/app/components/Weather/VWeather.vue';
import constants from '@/constants.json'; 

export default {
    components: {
        Notification,
        VWeather
    },
    data() {
        return {
			toggle: false,
            meters: [],
            date: moment().format('LLL'),
            position: {
                lat: 0,
                lon: 0
            },
            showCollapse: false,
            services: [],
            trialDaysLeft: ''
        }
    },

    computed: {
        currentView: {
            get() {
                return this.$store.state.currentView;
            },
            set() {}
        },
        selectedService() {
            return this.$store.state.selectedService;
        },
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
        },
        location() {
            return this.$store.getters['user/getUserCompany'].location;
        },
        meterAvailable() {
            return this.$store.state.meter.isAvailable;
        }
    },

    watch: {
        location: function() {
            this.position = this.location;
        },
        currentView: function(newVal) {
            if (newVal !== 'dashboard') {
                this.showCollapse = false;
            }
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
        if (!this.isAdmin) {
            this.getMeters();
        } else {
            this.$store.commit('setServiceSelected', 'Servicio 1');
        }
    },

    mounted() {
        setInterval(() => {
            this.date = moment().format('LLL');
        }, 1000);
        if (this.isAdmin) {
            this.position = {lat: 20.659698,lon: -103.349609};
            navigator.geolocation.getCurrentPosition( position => {
                this.position = {lon: position.coords.longitude, lat: position.coords.latitude}
                },
                (error) => {
                    console.log(error.message);
                }, {
                    enableHighAccuracy: true,
                    timeout: 5000
                }
            );
        }
    },

    methods: {
        toggleShowCollapse() {
            this.showCollapse = !this.showCollapse;
        },
        goTo(route) {
            this.$router.push({name: route});
        },
        changeSelectedService(service) {
            if (this.currentView !== 'dashboard' || this.selectedService !== service) {
                this.$store.commit('setServiceSelected', service);
                this.goTo('dashboard');
            }
            if (this.currentView !== 'dashboard' && this.services.length === 1) this.goTo('dashboard');
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
        getMeters() {
            let companyId = JSON.parse(localStorage.getItem('user')).company_id;
            designatedMeters.find({
                filter: {
                    where: {
                        company_id: companyId
                    },
                    include: ['services']
                }
            }).then(designatedMeters => {
                this.meters = designatedMeters;
                this.$store.dispatch('meter/setMeterAvailability', this.meters[0].isAvailable);
                this.services = this.meters[0].services.map(service => service.serviceName);
                this.$store.commit('setServiceSelected', (this.services) ? this.services[0]: '');
                this.$store.commit('setUserServices', this.services);
            });
        },
        getTrialDaysLeft() {
            eUsers.getTrialDaysLeft(
                this.user.user.id,
            ).then(res => {
                if(res.days < 0)  {
                    this.logout();
                }
                this.trialDaysLeft = res.days;
            });
        }
    }
}
</script>

<style lang="scss">
@import '../../styles/menu.scss';
</style>
g