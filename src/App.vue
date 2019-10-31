<template>
    <v-app>
        <Navbar />

        <v-content>
            <transition enter-active-class="animated pulse" leave-active-class="animated fadeOut" mode="out-in">
                <router-view></router-view> 
            </transition> 
        </v-content>
    </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
    components: { Navbar },

    data: () => ({
      //
    })
}
</script>
