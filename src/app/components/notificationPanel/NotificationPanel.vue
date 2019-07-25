<template>
    <b-dropdown
        class="alert"
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
        right
        text="notificaciones">
        <template slot="button-content">
            <i class="far fa-bell" style="font-size: 18px"></i>
        </template>
        <b-dropdown-header id="dropdown-header-label">
            <span>Notificaciones</span>
        </b-dropdown-header>
        <Log v-for="log in [1,2,3,4,5,6,7,8,9,10]" :key="log"/>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-text class="more">
            <p style="
            text-align:center;
            color: #0056b3;
            font-size: 1rem;
            height: 1rem;
            margin: 0 0 0.3rem 0;
            "><a href="#">Ver más</a></p>
        </b-dropdown-text>
    </b-dropdown>
</template>

<script src="./notificationPanel"></script>

