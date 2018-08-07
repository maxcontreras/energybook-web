<template>
    <b-row id="profile" class="main">
        <b-col>
            <b-card class="profile-header">
                <b-row>
                    <b-col md="4" class="user-info">
                        <img src="/assets/images/user-avatar.png"/>
                        <h5>{{user.fullname}}</h5>
                        <p>{{user.company.company_name}}</p>
                    </b-col>
                    <b-col md="8" class="map-container">
                        <!--<img src="/assets/images/map-example.jpg"/>-->
                    </b-col>
                </b-row>
                <b-row class="header-bottom" align-h="around">
                    <b-col>
                        MIEMBRO DESDE {{user.created_at}}
                    </b-col>
                    <b-col>
                        ÚLTIMO INICIO DE SESIÓN {{user.lastLogin}}
                    </b-col>
                </b-row>
            </b-card>
            <b-row>
                <b-col>
                    <b-card class="profile-main">
                        <b-row align-h="end">
                            <b-col md="6" class="action" v-if="!edit && !changePassword && !editCompany">
                                <b-button :variant="'outline-success'" class="right" @click="changePassword = true">
                                    Cambiar Contraseña
                                </b-button>
                                <b-button v-if="isAdmin || isManager" :variant="'outline-success'" class="right" @click="editCompany = true">
                                    Editar Compañía
                                </b-button>
                                <b-button :variant="'outline-success'" class="right" @click="edit = true">
                                    Editar Correo
                                </b-button>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col  md="6">
                            <b-form-group label="Email" v-if="!changePassword && !editCompany">
                                <b-form-input :readonly="!edit" :type="'email'" v-model="user.email" required placeholder="Email"></b-form-input>
                            </b-form-group>
                            <div v-if="changePassword">
                                <b-form-group>
                                    <b-form-input :type="'password'" required placeholder="Nueva Contraseña"></b-form-input>
                                </b-form-group>
                                <b-form-group>
                                    <b-form-input :type="'password'" required placeholder="Confirmar Contraseña"></b-form-input>
                                </b-form-group>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="profile-company"  v-if="!changePassword && !edit">
                            <h5 v-if="!editCompany">Mi compañía</h5>
                            <b-col>
                                <b-form-group label="Nombre">
                                    <b-form-input :readonly="!editCompany" :type="'text'" v-model="user.company.company_name" required placeholder="Nombre"></b-form-input>
                                </b-form-group>
                                <b-form-group label="Teléfono">
                                    <b-form-input :readonly="!editCompany" :type="'text'" v-model="user.company.phone" required placeholder="Teléfono"></b-form-input>
                                </b-form-group>
                                <b-form-group label="Número de empleados">
                                    <b-form-input :readonly="!editCompany" :type="'number'" v-model="user.company.size" required placeholder="Número de empleados"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Razón Social">
                                    <b-form-input :readonly="!editCompany" :type="'text'" v-model="user.company.legal_name" required placeholder="Razón Social"></b-form-input>
                                </b-form-group>
                                <b-form-group label="Giro">
                                    <b-form-input :readonly="!editCompany" :type="'text'" v-model="user.company.company_type" required placeholder="Giro"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row class="edit-buttons" v-if="edit || changePassword || editCompany">
                            <b-col md="6">
                                <b-button :variant="'primary'" class="right" @click="saveChanges()">
                                    Guardar
                                </b-button>
                                <b-button :variant="'secondary'" @click="cancel()">
                                    Cancelar
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
                <!--<b-col md="3" class="side-card-container">
                    <b-card class="side-card">
                        <b-button :variant="'warning'">
                            Cambiar Contraseña
                        </b-button>
                    </b-card>
                </b-col>-->
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./userDetail"></script>