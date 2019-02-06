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
                type="number">
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
                type="number">
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
                type="number">
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
                type="number">
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
                type="number">
            </b-form-input>
        </b-form-group>
    </b-form>
</template>

<script>
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
        if (this.forceCurrentMonth) {
            this.$store.dispatch('meter/getCurrentCfePeriod');
        } else {
            this.$store.dispatch('meter/changeCfePeriod', {years: 0, months: 0});
        }
        this.resetPrices();
    },

    computed: {
        basePrice() {
            let priceType = (this.forceCurrentMonth)? 'currentPrices':'prices';
            return this.$store.state.meter.cfeValues[priceType].base;
        },
        middlePrice() {
            let priceType = (this.forceCurrentMonth)? 'currentPrices':'prices';
            return this.$store.state.meter.cfeValues[priceType].middle;
        },
        peakPrice() {
            let priceType = (this.forceCurrentMonth)? 'currentPrices':'prices';
            return this.$store.state.meter.cfeValues[priceType].peak;
        },
        capacityPrice() {
            let priceType = (this.forceCurrentMonth)? 'currentPrices':'prices';
            return this.$store.state.meter.cfeValues[priceType].capacity;
        },
        distributionPrice() {
            let priceType = (this.forceCurrentMonth)? 'currentPrices':'prices';
            return this.$store.state.meter.cfeValues[priceType].distribution;
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
        }
    },

    methods: {
        savePrices() {
            if (parseFloat(this.base) > 0 &&
                parseFloat(this.middle) > 0 &&
                parseFloat(this.peak) > 0 &&
                parseFloat(this.capacity) > 0 &&
                parseFloat(this.distribution) > 0) {
                let data = {
                    base: this.base,
                    middle: this.middle,
                    peak: this.peak,
                    capacity: this.capacity,
                    distribution: this.distribution
                }
                this.$store.dispatch('meter/setCfePrices', data)
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
