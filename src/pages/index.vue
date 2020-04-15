<template>
  <v-app>
    <Header/>
    <v-content>
        <v-row
          align="stretch"
          text-center
          wrap
          class ="mx-2"
        >
          <v-col cols="6">
            <network-parser/>
          </v-col>
          <v-col cols="6">
            <vehicle-parser/>
          </v-col>

        </v-row>
    </v-content>
  </v-app>
</template>

<script>
import Header from '../components/Header.vue'
import NetworkParser from '../components/NetworkParser'
import VehicleParser from '../components/VehicleParser'

export default {
    name: 'Index',
    components: {
        Header,
        NetworkParser,
        VehicleParser
    }
}
</script>