<template>
    <b-row
        id="profile"
        class="main">
        <b-col>
            <b-card class="profile-header">
                <b-row>
                    <b-col md="4" class="user-info">
                        <img src="/assets/images/user-avatar.png" />
                        <h5 v-if="!isCompanyProfile">
                            {{ userFullname }}
                        </h5>
                        <p>
                            {{ user.company.company_name }}
                        </p>
                    </b-col>
                    <b-col md="8" class="profile-map-container">
                        <GmapMap
                            :center="{lat:20.663782, lng:-103.3916394}"
                            :zoom="7"
                            map-type-id="roadmap"
                            :options="{ disableDefaultUI : true }"
                            >
                            <GmapMarker
                                :position="companyPosition"
                                :clickable="false"
                                :draggable="false"
                                :icon="marker"
                            />
                        </GmapMap>
                    </b-col>
                </b-row>
                <b-row
                    class="header-bottom"
                    align-h="around">
                    <b-col>
                        MIEMBRO DESDE {{ userCreatedAt }}
                    </b-col>
                    <b-col v-if="!isCompanyProfile">
                        ÚLTIMO INICIO DE SESIÓN {{ userLastLogin }}
                    </b-col>
                </b-row>
            </b-card>
            <b-row>
                <b-col>
                    <b-card class="profile-main" no-body>
                        <b-tabs pills card>
                            <b-tab title="Información">
                                <b-row align-h="end">
                                    <b-col
                                        v-if="!edit && !changePassword && !editCompany"
                                        md="6"
                                        class="action" >
                                        <b-button
                                            hidden
                                            v-if="!isCompanyProfile"
                                            :variant="'outline-success'"
                                            class="right"
                                            @click="changePassword = true">
                                            Cambiar Contraseña
                                        </b-button>
                                        <b-button
                                            v-if="isAdmin || isManager"
                                            :variant="'outline-success'"
                                            class="right"
                                            hidden
                                            @click="editCompany = true">
                                            Editar Compañía
                                        </b-button>
                                        <b-button
                                            hidden
                                            v-if="!isCompanyProfile"
                                            :variant="'outline-success'"
                                            class="right"
                                            @click="edit = true">
                                            Editar Correo
                                        </b-button>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col  md="6">
                                        <b-form-group
                                            v-if="!changePassword && !editCompany && !isCompanyProfile"
                                            label="Email">
                                            <b-form-input
                                                :readonly="!edit"
                                                :type="'email'"
                                                v-model="user.email"
                                                required
                                                placeholder="Email">
                                            </b-form-input>
                                        </b-form-group>
                                        <div v-if="changePassword">
                                            <b-form-group>
                                                <b-form-input
                                                    :type="'password'"
                                                    required
                                                    placeholder="Nueva Contraseña">
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group>
                                                <b-form-input
                                                    :type="'password'"
                                                    required
                                                    placeholder="Confirmar Contraseña">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-row
                                    class="profile-company"
                                    v-if="!changePassword && !edit">
                                    <h5 v-if="!editCompany && !isCompanyProfile">
                                        Mi compañía
                                    </h5>
                                    <b-col>
                                        <b-form-group label="Nombre">
                                            <b-form-input
                                                :readonly="!editCompany"
                                                :type="'text'"
                                                v-model="user.company.company_name"
                                                required
                                                placeholder="Nombre">
                                            </b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Teléfono">
                                            <b-form-input
                                                :readonly="!editCompany"
                                                :type="'text'"
                                                v-model="user.company.phone"
                                                required
                                                placeholder="Teléfono">
                                            </b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Tamaño de empresa">
                                            <b-form-input
                                                :readonly="!editCompany"
                                                :type="'text'"
                                                v-model="user.company.size"
                                                required
                                                placeholder="Tamaño de empresa">
                                            </b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <b-form-group 
                                            v-if="isUser"
                                            label="Puesto">
                                            <b-form-input
                                                :readonly="!editCompany"
                                                :type="'text'"
                                                v-model="user.position"
                                                required
                                                placeholder="Puesto">
                                            </b-form-input>
                                        </b-form-group>
                                        <b-form-group 
                                            v-else
                                            label="Razón Social">
                                            <b-form-input
                                                :readonly="!editCompany"
                                                :type="'text'"
                                                v-model="user.company.legal_name"
                                                required
                                                placeholder="Razón Social">
                                            </b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Giro">
                                            <b-form-input
                                                :readonly="!editCompany"
                                                :type="'text'"
                                                required
                                                placeholder="Industrial">
                                            </b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Ubicación">
                                            <b-form-input
                                                v-if="!editCompany"
                                                :readonly="true"
                                                required
                                                placeholder="Ubicación"
                                                :type="'text'"
                                                v-model="user.company.address">
                                            </b-form-input>
                                            <gmap-autocomplete
                                                v-if="editCompany"
                                                class="form-control">
                                            </gmap-autocomplete>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row
                                    class="edit-buttons"
                                    v-if="edit || changePassword || editCompany">
                                    <b-col md="6">
                                        <b-button
                                            :variant="'primary'"
                                            class="right"
                                            @click="saveChanges()">
                                            Guardar
                                        </b-button>
                                        <b-button
                                            :variant="'secondary'"
                                            @click="cancel()">
                                            Cancelar
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </b-tab>
                            <b-tab
                                title="Usuarios"
                                v-if="isCompanyProfile">
                                <confirmation-dialog
                                    title="Agregar nuevo usuario"
                                    :show="showCreateUserModal"
                                    @cancel="hideUserModal"
                                    @hidden="hideUserModal"
                                    @accept="addNewUser">
                                    <b-form-group
                                        label="Nombre"
                                        label-for="userName">
                                        <b-form-input type="text" id="userName" v-model="newUser.name"/>
                                    </b-form-group>
                                    <b-form-group
                                        label="Apellido"
                                        label-for="userLastname">
                                        <b-form-input type="text" id="userLastname" v-model="newUser.lastname"/>
                                    </b-form-group>
                                    <b-form-group
                                        label="Correo"
                                        label-for="userEmail">
                                        <b-form-input type="email" id="userEmail" v-model="newUser.email"/>
                                    </b-form-group>
                                    <b-form-group
                                        label="Password"
                                        label-for="userPassword">
                                        <b-form-input type="text" id="userPassword" v-model="newUser.password"/>
                                    </b-form-group>
                                </confirmation-dialog>
                                <confirmation-dialog
                                    title="Atención"
                                    :show="showPasswordResetModal"
                                    @cancel="() => showPasswordResetModal = false"
                                    @hidden="() => showPasswordResetModal = false"
                                    @accept="resetPassword">
                                    <b-form>
                                            <b-form-group
                                        label="Password"
                                        label-for="password">
                                          <b-form-input type="text" id="password" v-model="password"/>
                                    </b-form-group>
                                    
                                    <p>Se restablecerá la contraseña del usuario {{selectedUser.Nombre}}. <br> Esta seguro?</p> 
                                    </b-form>
                                </confirmation-dialog>
                                <div class="text-right mb-5 mt-2">
                                    <b-button
                                        variant="success"
                                        @click="showUserModal">
                                        Agregar usuario
                                    </b-button>
                                </div>
                                <v-table
                                    :items="items.users"
                                    :fields="fields.users"
                                    @reset-password="showPasswordReset"
                                    @delete="deleteUser"/>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./userDetail">


/*                             <b-tab
                                title="Medidores"
                                v-if="isCompanyProfile">
                                <v-table
                                    :items="items.meters"
                                    :fields="fields.meters"/>
                            </b-tab>
                            */</script>
