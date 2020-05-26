<template>
    <v-card
        class="pa-2"
        tile
        shaped
        style="height: 650px; background-color:#F0F8FF; text-align:center;"
    >
    <v-card-title
    class="headline" style="display: inline-block;">
        Network Input Parser
    </v-card-title>
    <!-- <v-file-input show-size label="Choose Network File"></v-file-input> -->

    <div class="container input_params">
        <div style="font-size:20px"> Parameters </div>
        <v-text-field
            label="Request Name"
            v-on:change="setReqName($event)"
        ></v-text-field>
        <v-text-field
            label="Request Time"
            v-on:change="setReqTime($event)"
        ></v-text-field>
    </div>


    <div class="container" style="font-size:20px">
        Network Structure XML
        <div class="large-12 medium-12 small-12 cell file_upload" style="font-size:14px; padding: 5px;">
            <!-- <label for="file1" ><span>Choose a file&hellip;</span></label> -->
            <v-file-input
                
                color="deep-purple accent-4"
                counter
                label="Network Structure File"
                placeholder="Select your file"
                prepend-icon="mdi-paperclip"
                outlined
                v-on:change="handleFileUpload1($event)"
                :show-size="1000"
            >
                <template v-slot:selection="{ index, text }">
                    <v-chip
                        v-if="index < 2"
                        color="deep-blue accent-4"
                        dark
                        label
                        small
                    >
                        {{ text }}
                    </v-chip>

                    <!-- Display File Size-->
                    <span
                        v-else-if="index === 2"
                        class="overline grey--text text--darken-3 mx-2"
                    >
                        +{{ file.length - 2 }} File(s)
                    </span>
                </template>
            </v-file-input>
        </div>
    </div>

     <div class="container" style="font-size:20px">
        Virtual Network XML
        <div class="large-12 medium-12 small-12 cell file_upload" style="font-size:14px; padding:2px">
            <v-file-input
                
                color="deep-purple accent-4"
                counter
                label="Virtual Network File"
                placeholder="Select your file"
                prepend-icon="mdi-paperclip"
                outlined
                v-on:change="handleFileUpload2($event)"
                :show-size="1000"
            >
                <template v-slot:selection="{ index, text }">
                    <v-chip
                        v-if="index < 2"
                        color="deep-blue accent-4"
                        dark
                        label
                        small
                    >
                        {{ text }}
                    </v-chip>

                    <!-- Display File Size-->
                    <span
                        v-else-if="index === 2"
                        class="overline grey--text text--darken-3 mx-2"
                    >
                        +{{ file.length - 2 }} File(s)
                    </span>
                </template>
            </v-file-input>
        </div>
    </div>


    <button class='network_form' v-on:click="submitFile()">Submit</button>


    <!-- <simulation-panel/> -->
    </v-card>
</template>


<script>
const { BlobServiceClient } = require("@azure/storage-blob");

export default {
    name: 'NetworkParser',

    data() {
        return {
            structureFile : '',
            virtualNetworkFile: '',
            reqName: '',
            reqTime: ''
        }
    },

    methods : {
        handleFileUpload1(file) { // File Handling for Network Structure File
            this.structureFile = file;
            console.log(file);
        },

        handleFileUpload2(file) { // File Handling for Virtual Network File
            this.virtualNetworkFile = file;
            console.log(file);
        },
        setReqName(text) {
            this.reqName = text;
            console.log(text);
        },
        setReqTime(time){
            this.reqTime = time;
            console.log(time);
        },

        submitFile() {
            if (this.structureFile && this.virtualNetworkFile) {
                console.log("found file");

                let formData = new FormData();
                // object of key value pair
                formData.append('file', this.structureFile);


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
                const blobName = this.reqName + new Date().getTime();
                const blockBlobClient = containerClient.getBlockBlobClient(blobName);
                blockBlobClient.upload(this.structureFile, content.length);
            } else {
                console.log("there are no files.");
            }
        }
    },
}
</script>