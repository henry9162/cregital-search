<template>
    <v-app-bar height="80" flat app>
        <v-toolbar-title @click="$router.push({name: 'home'})" class="headline text-uppercase">
            <span class="hidden cregital-logo font-italic font-weight-bold blue--text pa-4">CREGITAL</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text @click="$router.push({name: 'results'})" target="_blank">
            <span class="mr-2">Search Results</span>
        </v-btn>

        <v-btn text href="#" class="mr-8" target="_blank">
            <v-icon>mdi-apps</v-icon>
        </v-btn>

        <v-btn color="red" dark href="#" small fab target="_blank">H</v-btn>
    </v-app-bar>
</template>

<script>

</script>

<style lang="scss">
    .cregital-logo:hover {
        cursor: pointer;
    }
</style>