<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <h2>
      GOOKTO
      </h2>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      @click.stop="dialog_open = true"
      text
    >
      <span class="mr-2">Who are we?</span>
      <v-icon
        large
        color="grey lighten-2"
      >
        mdi-help-circle
      </v-icon>

      <v-dialog
        v-model="dialog_open"
        max-width="500"
      >
        <v-card>
          <v-card-title class="headline">How to use?</v-card-title>

          <v-card-text>
            Explanation
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="dialog_open = false"
            >
              Quit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      dialog_open: false,
    }
  }
}
</script>