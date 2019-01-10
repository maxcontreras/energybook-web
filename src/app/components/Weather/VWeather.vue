<template>
    <b-container fluid class="weather">
        <b-row>
            <b-col md="2" class="text-center icon-container">
                <img class="weather-icon" :class="'ic-'+icon" :src="weatherIcon"/>
            </b-col>
            <b-col md="4" class="text-center">
                <h2 class="temperature">
                    {{temperature}}&#176;C
                </h2>
                <p>{{description}}</p>
            </b-col>
            <b-col md="6" class="text-left">
                <h2 class="city">{{location}}</h2>
                <p class="wind">Viento: <span>{{wind_speed}} m/s</span></p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script src="./vWeather"></script>

<style lang="scss" scoped>
    @import './vWeather.scss';
</style>
