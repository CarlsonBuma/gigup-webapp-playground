<template>

    <q-toolbar class="q-px-none">
                
        <!-- Logo -->
        <q-toolbar-title>
            <q-btn
                flat
                size="md"
                icon="menu_open"
                @click="$emit('logoClick')"
            />
        </q-toolbar-title>

        <!-- App Settings -->
        <q-btn flat round icon="settings" size="sm">
            <q-menu class="w-card-sm">
                <q-list separator>
                    
                    <q-item>
                        <q-item-section>
                            <q-item-label overline>App Preferences</q-item-label>
                        </q-item-section>
                    </q-item>

                    <!-- Dateformat -->
                    <q-item>
                        <q-select 
                            class="w-100" 
                            label="Datetime format" 
                            v-model="$tp.client_preferences.value.dateFormat" 
                            :options="$tp.client_options.date" 
                            @update:model-value="(value) => $tp.set_cookie('client_dateformat', value)"
                        />
                    </q-item>

                    <!-- Geolocation -->
                    <q-item>
                        <q-item-section>
                            <q-item-label caption><b>Current Location:</b></q-item-label>
                            <q-item-label caption>Used to calculate event distances more accurately.</q-item-label>
                        </q-item-section>
                    </q-item>
                    
                    <q-item clickable>
                        <q-item-section avatar>
                            <q-btn @click="updateLocationCookie()" size="sm" outline color="primary" dense icon="share_location">
                                <q-tooltip :offset="[10, 10]">Set Location.</q-tooltip>
                            </q-btn>
                        </q-item-section>
                        <q-item-section >
                            <q-item-label caption lines="1">
                                Lat: {{ location_lat ?? '-' }}<br>
                                Lng: {{ location_lng ?? '-' }}<br>
                            </q-item-label>
                        </q-item-section>
                    </q-item>

                    <!-- Darkmode -->
                    <q-item class="flex justify-start">
                        <q-toggle 
                            dense
                            class="text-caption text-grey"
                            label="Darkmode"
                            :model-value="$tp.client_preferences.value.darkmode"
                            @update:model-value="(value) => $tp.set_darkmode(value)"
                        />
                    </q-item>

                    <!-- Cookies -->
                    <q-item>
                        <q-item-section>
                            <q-item-label caption>
                                <b>Note:</b> Preferences are stored via client cookies.
                                <a href="#" @click.prevent="removeCookies()">Reset preferences</a>.
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>

        <!-- Geolocation -->
        <q-separator vertical color="white" class="q-my-md q-mx-sm" />
        <q-btn 
            flat round 
            size="md" 
            @click="$router.push('/')" 
            icon="share_location" 
        />
    </q-toolbar>

</template>

<script>
import { ref, getCurrentInstance } from 'vue';

export default {
    name: 'NavHead',
    props: {
        loading: Boolean
    },

    emits: [
        'logoClick',
    ],

    setup() {

        // Init
        const { proxy } = getCurrentInstance();
        const cookieLocation = proxy.$tp.get_cookie('client_location');
        const location_lat = ref(cookieLocation?.lat)
        const location_lng = ref(cookieLocation?.lng)
        
        // Cookies
        const updateLocationCookie = async() => {
            const location = await proxy.$tp.set_client_location();
            location_lat.value = location.lat
            location_lng.value = location.lng
        }

        const removeCookies = () => {
            proxy.$tp.remove_cookies()
            location_lat.value = '-'
            location_lng.value = '-'
        }
        
        return {
            location_lat,
            location_lng,
            updateLocationCookie,
            removeCookies
        };
    },
};
</script>
