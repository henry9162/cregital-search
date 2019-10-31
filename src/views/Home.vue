<template>
    <v-container>
        <v-row class="px-12">
            <v-col class="d-flex justify-center" cols="12">
                <v-card class="mt-10" style="width: 100%;">
                    <div class="text-center headline font-italic font-weight-bold orange--text pt-10 pb-2">CREGITAL</div>
                    <div class="text-center px-10">
                        <v-text-field v-model="searchInput" class="pt-6 px-12" color="orange" rounded outlined label="Search Cregital Images..."></v-text-field>
                        <v-progress-circular v-if="loader" :width="3" size="40" class="mb-6" color="orange" indeterminate></v-progress-circular>
                        <v-btn v-if="!loader" @click="search(searchInput)" depressed tile class="mb-10 px-7 mt-0" large dark color="orange">Search</v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import toastr from "toastr"

export default {
    data: () => ({
        searchInput: '',
        loader: false
    }),

    methods: {
        search(searchInput){
            if (!searchInput) { return } 
              else {
                this.loader = true
                axios
                    .get(`https://api.pexels.com/v1/search?query=${searchInput}&per_page=20&page=1`)
                    .then(response => {
                        this.loader = false
                        let results = response.data;
                        localStorage.setItem("Results", JSON.stringify(results));
                        localStorage.setItem("searchQuery", searchInput);
                        this.$router.push("/results");
                    })
                    .catch(e => {
                        this.loader = false;
                        let error = e.error;
                        toastr.warning(error);
                    });
                }
        }
    }
}
</script>
