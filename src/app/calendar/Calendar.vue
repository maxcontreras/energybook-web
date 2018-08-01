<template>
    <b-row id="calendar-v" class="main">
        <b-col>
            <Header :title="'Calendario'"/>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <full-calendar :events="events"></full-calendar>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./calendar"></script>

<style>
    @import '~fullcalendar/dist/fullcalendar.css';
</style> 