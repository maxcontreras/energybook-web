<template>
    <b-row id="clients">
        <b-col>
            <v-header
                :title="'Compañías'"
                :action="'Agregar Compañía'"
                :modalId="'companyModal'"
                />
            <b-row>
                <b-col>
                    <b-card>
                        <v-table
                            :items="items"
                            :fields="fields"
                            :route="'companyDetail'"
                            />
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
        <b-modal
            id="companyModal"
            size="lg"
            title="Compañía Nueva"
            @ok="createCompany">
            <companies-form
                :formSubmit="createCompany"
                :company="newCompany"
                :cities="cities"
                :availableUser="toggle.newUser"
                :user="newUser"
                :availableManager="toggle.newManager"
                :manager="newManager"
                />
        </b-modal>
    </b-row>
</template>

<script src="./companies">
</script>
