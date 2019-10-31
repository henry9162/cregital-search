<template>
    <div>
        <v-container>
            <div class="d-flex justify-space-between mt-8">
                <div v-if="!searchResults">
                    <span>Sorry!.. no result found for <span class="headline font-italic red--text font-weight-bold">{{ query }}</span></span>
                </div>
                <div>
                    <span>Showing search results for <span class="headline font-italic red--text font-weight-bold">{{ query }}</span></span>
                </div>
                <div class="d-flex">
                    <v-btn @click="getPrev()" v-if="isMultiplePage" text large depressed color="primary" dark>
                        <v-icon x-large>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn @click="getNext()" text large depressed color="primary" dark>
                        <v-icon x-large>mdi-arrow-right</v-icon>
                    </v-btn>
                </div>
            </div>
            <v-row>    
                <v-col class="px-2 pb-1" v-for="(image, i) in searchResults.photos" :key="i" cols="3">
                    <v-hover v-slot:default="{ hover }">
                        <v-card :id="image.id" @click.prevent="viewImage($event)" :elevation="hover ? 20 : 1" flat>
                            <v-img :aspect-ratio="hover ? 18/9 : 16/9" :src="image.src.medium"></v-img>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>

            <div class="d-flex mt-6 mb-4" :class="isMultiplePage ? 'justify-space-between' : 'justify-end' ">
                <v-btn @click.prevent="getPrev" v-if="isMultiplePage" text large depressed color="primary" dark>
                    <v-icon x-large>mdi-arrow-left</v-icon>
                </v-btn>
                <v-btn @click.prevent="getNext" text class="pl-7" large depressed color="primary" dark>
                    <v-icon x-large>mdi-arrow-right</v-icon>
                </v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
import toastr from "toastr"
import axios from "axios"

export default {
    data: () => ({
        searchResults: [],
        isMultiplePage: false,
        nextUrl: "",
        prevUrl: "",
        query: ""
    }),

    methods: {
        fetchResults() {
            let results = JSON.parse(localStorage.getItem("Results"));
            let searchQuery = localStorage.getItem("searchQuery");
            searchQuery ? this.query = searchQuery : '';
            this.searchResults = results;
            this.nextUrl = results.next_page ? results.next_page : "";
            if (results.prev_page) {
                this.prevUrl = results.prev_page;
                this.isMultiplePage = true;
            }
        },

        viewImage($event) {
            let id = event.currentTarget.id;
            this.$router.push(`/image/${id}`);
        },

         getNext() {
            axios.get(this.nextUrl)
                .then(response => {
                    let results = response.data;
                    this.searchResults = results
                    localStorage.removeItem("Results");
                    localStorage.setItem("Results", JSON.stringify(results));
                    this.fetchResults();
                })
                .catch(e => {
                    let error = e.error;
                    toastr.warning(error);
                });
        },
        getPrev() {
            axios.get(this.prevUrl)
            .then(response => {
                let results = response.data;
                this.searchResults = results;
                localStorage.removeItem("Results");
                localStorage.setItem("Results", JSON.stringify(results));
                this.fetchResults();
            })
            .catch(e => {
                let error = e.error;
                toastr.warning(error);
            });
        }
    },

    mounted() {
        this.fetchResults();
    }
}
</script>