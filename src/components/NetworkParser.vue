<template>
    <v-card
        class="pa-2"
        tile
        shaped
        style="height: 650px; background-color:#F0F8FF;"
    >
    <v-card-title
    class="headline">
        Network Input Parser  
    </v-card-title>
    <v-file-input show-size label="Choose Network File"></v-file-input>


    <div class="container">
        <div class="large-12 medium-12 small-12 cell">
        <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
            <button v-on:click="submitFile()">Submit</button>
        </div>
    </div>

    <simulation-panel/>
    </v-card>
</template>


<script>
import SimulationPanel from './SimulationPanel.vue'
import axios from 'axios'

export default {
    name: 'NetworkParser',
    components: {
        SimulationPanel
    },
    methods : {
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        submitFile() {
            if (this.file) {
                console.log("found file");

                let formData = new FormData();
                // object of key value pair
                formData.append('file', this.file);


                //file format configurations can be made here
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'text/plain',
                        'Accept': '*',
                    }
                };

                /*
                    Make the request to the POST /single-file URL
                */
                axios.post( 'http://localhost:8081/single-file',
                    formData, axiosConfig
                ).then(response => {
                    console.log("Success!");
                    console.log({ response });
                }
                ).catch(error => {
                    console.log({ error });
                });
            } else {
                console.log("there are no files.");
            }
        }
    },
    data() {
        return {
            file : ''
        }
    }
}
</script>