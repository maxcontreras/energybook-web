<template>
    <b-row id="dashboard" class="main">
        <b-col>
            <b-row class="dashboard-content--admin">
                <b-col md="6">
                    <b-card class="list">
                        <Table :items="items" :fields="fields" />
                    </b-card>
                </b-col>
                <b-col md="6">
                    <b-card class="dashboard-map-container">
                        <GmapMap
                        :center="{lat:20.663782, lng:-103.3916394}"
                        :zoom="7"
                        map-type-id="roadmap"
                        :options="{ disableDefaultUI : true }"
                        >
                        <GmapMarker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m"
                            :clickable="true"
                            :draggable="false"
                        />
                        </GmapMap>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./dashboardAdmin"></script>

<style lang="scss">
@import '../../styles/dashboard.scss';
</style>