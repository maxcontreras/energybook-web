import DesignatedMeter from '@/services/designatedMeters';
import constants from '@/constants.json';

export default {
    props: {
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            description: null,
            condition: null,
            temperature: null,
            location: null,
            wind_speed: null,
            icon: ''
        }
    },

    mounted() {
        if (this.lat !== 0 && this.lon !== 0) {
            this.getData();
        }
    },

    computed: {
        weatherIcon() {
            return constants.Weather.condition_icons[this.icon];
        }
    },

    watch: {
        lat: function(){
            this.getData();
        }
    },

    methods: {
        getData() {
            DesignatedMeter.getWeather(this.lat, this.lon)
                .then(({results}) => {
                    this.temperature = results.main.temp;
                    this.description = results.weather[0].description;
                    this.condition = results.weather[0].main;
                    this.location = results.name;
                    this.wind_speed = results.wind.speed;
                    this.icon = results.weather[0].icon;
                });
        }
    }
}