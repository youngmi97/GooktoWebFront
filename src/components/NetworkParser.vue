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
const { BlobServiceClient } = require("@azure/storage-blob");

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


                /*
                    Make the request to the POST /single-file URL
                */

                // Enter your storage account name and shared key
                const account = "siminoutdb";
                const sas = "se=2021-05-21&sp=rwdlac&sv=2018-03-28&ss=b&srt=sco&sig=YpAmPl9%2BJEZsTAecambIl4UYSwQqI9haA/3LFQyyQzo%3D";
                
                const blobServiceClient = new BlobServiceClient(
                    `https://${account}.blob.core.windows.net?${sas}`
                );

                const containerClient = blobServiceClient.getContainerClient('inputdb');

                const content = "Hello world!";
                const blobName = "networkfile" + new Date().getTime();
                const blockBlobClient = containerClient.getBlockBlobClient(blobName);
                blockBlobClient.upload(this.file, content.length);
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