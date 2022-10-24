<template>
    <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import data from './../data/data.json';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW50aG9ueWJ1ZGQiLCJhIjoiY2w3c3hmb2ZiMHRhbjN1bzBjYXBkNjV3eCJ9.jP9VLvEEWfFBREhLF-AzJQ';


export default {
    name: 'MapView',
    data() {
        return {
            map: null,
        };
    },
    async mounted() {
        console.log(data);

        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-98, 40],
            zoom: 4,
            projection: 'globe'
        });

        this.map.on('load', async () => {
            const featureCollection = this.generateFeatureCollection();
            this.map.addSource('events', {
                type: 'geojson',
                data: featureCollection
            });

            const bounds = new mapboxgl.LngLatBounds();
            featureCollection.features.forEach((feature) => bounds.extend(feature.geometry.coordinates));
            this.map.fitBounds(bounds, { padding: 100 });

            this.map.addLayer({
                id: 'earthquakes-heat',
                type: 'heatmap',
                source: 'events',
                paint: {
                    'heatmap-weight': {
                        property: 'rssi',
                        type: 'exponential',
                        stops: [
                            [1, 0],
                            [62, 1]
                        ]
                    },
                }
            },
                'waterway-label');
        });

        this.map.on('mouseenter', 'points', () => {
            this.map.getCanvas().style.cursor = 'pointer';
        });

        this.map.on('mouseleave', 'points', () => {
            this.map.getCanvas().style.cursor = '';
        });

        this.map.on('click', 'points', (e) => {
            const event = e.features[0].properties;
            console.log(event);

            // const coordinates = e.features[0].geometry.coordinates.slice();
            // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            // }

            // new mapboxgl.Popup()
            //     .setLngLat(coordinates)
            //     .setHTML(description)
            //     .addTo(this.map);
        });

        this.map.on('style.load', () => {
            this.map.setFog({});
        });
    },
    methods: {
        generateFeatureCollection() {
            return {
                type: 'FeatureCollection',
                features: data.map((event) => {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [event.lon, event.lat]
                        },
                        properties: event
                    };
                })
            };
        }
    }
};
</script>

<style lang="sass">
#map 
    height: 100%
    width: 100%
</style>
