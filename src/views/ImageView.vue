<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="d-flex justify-center" cols="12">
                    <v-card style="width: 100%" class="pa-4 mt-12 text-center">
                        <v-img :aspect-ratio="16/9" :src="selectedImg.src.large"></v-img>
                        <div class="mt-4">
                            <p class="card-text">
                                <span class="grey--text text--darken-2 font-weight-bold">Author:</span> <span class="font-italic">{{selectedImg.photographer}}</span>
                            </p>
                            <router-link :to="selectedImg.src.original" target="_blank">Download</router-link>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        selectedImg: {}
    }),

     methods: {
        loadImage() {
        let imageId = this.$route.params.id;
        let results = JSON.parse(localStorage.getItem("Results"));
        let image = results.photos.filter(img => img.id == imageId);
        this.selectedImg = image[0];
        }
    },

    mounted() {
        this.loadImage();
    }
}
</script>