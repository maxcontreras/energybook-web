<template>
    <b-form
        :class="{'medium': !fullWidth}"
        class="prices-form"
        @submit="(e) => {e.preventDefault()}">
        <div
            v-show="allowEditing"
            class="edit-buttons text-right">
            <span
                @click="savePrices"
                v-if="isEditing">
                <i class="far fa-save"></i>
            </span>
            <span
                @click="cancelEditing"
                v-if="isEditing">
                <i class="fas fa-trash-alt"></i>
            </span>
            <span
                @click="editFields"
                v-else>
                <i class="fas fa-edit"></i>
            </span>
        </div>
        <b-form-group
            label="Precio ordinario:"
            label-for="ordinary">
            <b-form-input
                v-model="ordinary"
                id="ordinary"
                :disabled="!isEditing"
                step="any"
                type="text">
            </b-form-input>
        </b-form-group>
        <b-form-group
            label="Precio capacidad:"
            label-for="capacity_price">
            <b-form-input
                v-model="capacity"
                id="capacity_price"
                :disabled="!isEditing"
                step="any"
                type="text">
            </b-form-input>
        </b-form-group>
        <b-form-group
            label="Precio distribución:"
            label-for="distribution_price">
            <b-form-input
                v-model="distribution"
                id="distribution_price"
                :disabled="!isEditing"
                step="any"
                type="text">
            </b-form-input>
        </b-form-group>
    </b-form>
</template>

<script>
import constants from '@/constants.json';

export default {
    props: {
        allowEditing: {
            type: Boolean,
            default: true
        },
        fullWidth: {
            type: Boolean,
            default: true
        },
        forceCurrentMonth: {
            type: Boolean
        }
    },

    data() {
        return {
            ordinary: null,
            capacity: null,
            distribution: null,
            isEditing: false
        }
    },

    beforeMount() {
        this.resetPrices();
        this.$store.dispatch('meter/getCurrentCfePeriod', this.userCompany);
    },

    computed: {
        ordinaryPrice() {
            let priceType = (this.forceCurrentMonth)? 'currentPrices':'prices';
            return this.$store.state.meter.cfeValues.GDMTO[priceType].ordinary;
        },
        capacityPrice() {
            let priceType = (this.forceCurrentMonth)? 'currentPrices':'prices';
            return this.$store.state.meter.cfeValues.GDMTO[priceType].capacity;
        },
        distributionPrice() {
            let priceType = (this.forceCurrentMonth)? 'currentPrices':'prices';
            return this.$store.state.meter.cfeValues.GDMTO[priceType].distribution;
        },
        userCompany() {
            return this.$store.getters['user/getUserCompany'];
        },
        isAdmin() {
            return JSON.parse(localStorage.getItem('user')).role_id === 1;
        },
        cities() {
            return constants.Cities;
        },
        selectedCity() {
            return this.$store.state.meter.cfeValues.citySelected;
        }
    },

    watch: {
        ordinaryPrice(newValue) {
            this.ordinary = newValue;
        },
        capacityPrice(newValue) {
            this.capacity = newValue;
        },
        distributionPrice(newValue) {
            this.distribution = newValue;
        },
        userCompany(company) {
            if (this.forceCurrentMonth) {
                this.$store.dispatch('meter/getCurrentCfePeriod', company);
            } else {
                this.$store.dispatch('meter/changeCfePeriod', {date: {years: 0, months: 0}, city: company.city});
            }
            this.resetPrices();
        }
    },

    methods: {
        savePrices() {
            if (!isNaN(this.ordinary) && parseFloat(this.ordinary) > 0 &&
                !isNaN(this.capacity) && parseFloat(this.capacity) > 0 &&
                !isNaN(this.distribution) && parseFloat(this.distribution) > 0) {
                let payload = {
                    ordinary: parseFloat(this.ordinary),
                    capacity: parseFloat(this.capacity),
                    distribution: parseFloat(this.distribution)
                }
                let city = '';
                if (this.isAdmin) {
                    city = this.cities[this.selectedCity];
                } else {
                    city = this.userCompany.city;
                }
                this.$store.dispatch('meter/setCfePrices', {city, payload, tariffType:"GDMTO"})
                    .then(() => {
                        this.$notify({
                            group: 'notification',
                            type: 'success',
                            title: 'Los precios de este mes se cambiaron correctamente'
                        });
                    })
                    .catch(err => {
                        this.$notify({
                            group: 'notification',
                            type: 'error',
                            title: 'No fue posible cambiar los precios'
                        });
                    })
                    .finally(() => {
                        this.isEditing = false;
                    });
            } else {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    title: 'Verifica que los campos estén llenados de forma correcta'
                });
            }
        },
        resetPrices() {
            this.ordinary = this.ordinaryPrice;
            this.capacity = this.capacityPrice;
            this.distribution = this.distributionPrice;
        },
        editFields() {
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
            this.resetPrices();
        },
    }
}
</script>

<style lang="scss" scoped>

.edit-buttons {
    margin-bottom: 2rem;

    span {
        &:hover {
            cursor: pointer;
        }
        margin-right: 1rem;
        &:last-child {
            margin-right: 0;
        }
    }
}

.prices-form {
    &.medium {
        width: 30% !important;
    }
    margin: 0 auto;
}
</style>
