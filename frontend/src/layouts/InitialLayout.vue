<style scoped>
.rounded-corners {
    border-radius: 12px; /* rounds all corners */
}
</style>

<template>
    <q-layout view="lHh LpR lff">
        
        <q-header 
            elevated
            class="q-ma-sm shadow-1 rounded-corners"
            :class="{
                'bg-dark': $q.dark.isActive,
                'bg-header-bright-mode': !$q.dark.isActive,
            }"
        >
            <q-toolbar>
                <NavHead
                    @logoClick="toggleLeftDrawer"
                />
                <q-separator color="white" />
            </q-toolbar>
        </q-header>

        <q-drawer
            class="rounded-corners"
            v-model="leftDrawerOpen"
            show-if-above
            bordered
        >
            <NavApp 
                class="rounded-corners"
                @setSession="(route) => $emit('setSession', route)"
                @logout="$emit('logout')"
            />
        </q-drawer>

        <!-- Content -->
        <q-page-container
            id="app-content"
            :class="{
                'background': !$q.dark.isActive,
                'background-dark': $q.dark.isActive
            }"
        >
            <router-view 
                @setSession="(route) => $emit('setSession', route)"
                @removeSession="$emit('removeSession')"
            />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import NavHead from './navigation/NavHead.vue'
import NavApp from './navigation/NavApp.vue'

export default defineComponent({
  name: 'InitialLayout',

    components: {
        NavHead, NavApp
    },

    emits: [
        'setSession',
        'removeSession',
        'logout'
    ],

    setup () {
        const leftDrawerOpen = ref(false)

        return {
            leftDrawerOpen,
            toggleLeftDrawer () {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }
        }
    },

    methods: {
        //
    },
})
</script>
