<template>
  <b-row id="dashboard" class="main">
    <b-col>
      <b-row class="dashboard-content--admin">
        <b-col md="6">
          <b-card class="list">
            <v-table :items="items" :fields="fields" />
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card class="dashboard-map-container">
            <gmap-map
              :center="{ lat: 20.663782, lng: -103.3916394 }"
              :zoom="7"
              map-type-id="roadmap"
              :options="{ disableDefaultUI: true }"
              style="width: 100%; height: 100%"
            >
              <gmap-marker
                :key="index"
                v-for="(marker, index) in markers"
                :position="marker.position"
                infoWindow="Hey"
                :clickable="true"
                :draggable="false"
                :icon="marker.icon"
                @click="showInfo(marker, index)"
              />

              <gmap-info-window
                :options="infoOptions"
                :position="infoWindowPos"
                :opened="infoWinOpen"
                @closeclick="infoWinOpen = false"
              >
                <div v-html="infoContent"></div>
              </gmap-info-window>
            </gmap-map>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script src="./dashboardAdmin"></script>

<style lang="scss">
@import "../../styles/dashboard.scss";
</style>
