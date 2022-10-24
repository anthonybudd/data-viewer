<template>
    <v-app>
        <notifications position="top center" />

        <v-main v-if="hasInitialized">
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'


export default {
    name: 'App',
    data() {
        return {
            hasInitialized: true,
        }
    },
    async mounted() {},
}
</script>

<style lang="sass">
@import './style.sass'
@import './../node_modules/mapbox-gl/dist/mapbox-gl.css'
</style>
