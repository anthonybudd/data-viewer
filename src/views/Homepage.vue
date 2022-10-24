<template>
    <v-container fluid fill-height class="grey lighten-3 p-0">
        <v-row class="fill-height">
            <v-col class="p-0">
                <map-view></map-view>
            </v-col>
        </v-row>
      </v-container>
</template>

<script>
import MapView from './../components/MapView.vue';

export default {
    name: 'Dashboard',
    components: {
        MapView,
    },
};
</script>
