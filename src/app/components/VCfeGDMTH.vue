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
            label="Precio base:"
            label-for="base_price">
            <b-form-input
                v-model="base"
                id="base_price"
                :disabled="!isEditing"
                step="any"
                type="text">
            </b-form-input>
        </b-form-group>
        <b-form-group
            label="Precio media:"
            label-for="middle_price">
            <b-form-input
                v-model="middle"
                id="middle_price"
                :disabled="!isEditing"
                step="any"
                type="text">
            </b-form-input>
        </b-form-group>
        <b-form-group
            label="Precio punta:"
            label-for="peak_price">
            <b-form-input
                v-model="peak"
                id="peak_price"
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
            base: null,
            middle: null,
            peak: null,
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
        basePrice() {
            if(this.forceCurrentMonth) {
                return this.$store.state.meter.cfeValues.currentPrices.basePrice;
            }
            return this.$store.state.meter.cfeValues.GDMTH.prices.base;
        },
        middlePrice() {
            if(this.forceCurrentMonth) {
                return this.$store.state.meter.cfeValues.currentPrices.middlePrice;
            }
            return this.$store.state.meter.cfeValues.GDMTH.prices.middle;
        },
        peakPrice() {
            if(this.forceCurrentMonth) {
                return this.$store.state.meter.cfeValues.currentPrices.peakPrice;
            }
            return this.$store.state.meter.cfeValues.GDMTH.prices.peak;
        },
        capacityPrice() {
            if(this.forceCurrentMonth) {
                return this.$store.state.meter.cfeValues.currentPrices.capacityPrice;
            }
            return this.$store.state.meter.cfeValues.GDMTH.prices.capacity;
        },
        distributionPrice() {
            if(this.forceCurrentMonth) {
                return this.$store.state.meter.cfeValues.currentPrices.distributionPrice;
            }
            return this.$store.state.meter.cfeValues.GDMTH.prices.distribution;
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
        basePrice(newValue) {
            this.base = newValue;
        },
        middlePrice(newValue) {
            this.middle = newValue;
        },
        peakPrice(newValue) {
            this.peak = newValue;
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
            if (!isNaN(this.base) && parseFloat(this.base) > 0 &&
                !isNaN(this.middle) && parseFloat(this.middle) > 0 &&
                !isNaN(this.peak) && parseFloat(this.peak) > 0 &&
                !isNaN(this.capacity) && parseFloat(this.capacity) > 0 &&
                !isNaN(this.distribution) && parseFloat(this.distribution) > 0) {
                let payload = {
                    base: parseFloat(this.base),
                    middle: parseFloat(this.middle),
                    peak: parseFloat(this.peak),
                    capacity: parseFloat(this.capacity),
                    distribution: parseFloat(this.distribution)
                }
                let city = '';
                if (this.isAdmin) {
                    city = this.cities[this.selectedCity];
                } else {
                    city = this.userCompany.city;
                }
                this.$store.dispatch('meter/setCfePrices', {city, payload, tariffType: "GDMTH"})
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
            this.base = this.basePrice;
            this.middle = this.middlePrice;
            this.peak = this.peakPrice;
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
