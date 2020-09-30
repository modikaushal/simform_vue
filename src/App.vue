<template>
  <v-app>
    <v-app-bar v-if="currentRouteName !== 'Login'"
      color="deep-purple"
      dark
      fixed
      dense
      app
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Simform Demo</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-if="currentRouteName !== 'Login'"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Kaushal Modi
          </v-list-item-title>
          <v-list-item-subtitle>
            Test Account
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item :to="{name:'Category'}" :class="{active_class: (currentRouteName === 'Category') ? true: false}">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Category</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{name:'Product'}" :class="{active_class: (currentRouteName === 'Product') ? true: false}">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Product</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<style type="text/css">
/*.v-list-item--active {
  color: rgba(0, 0, 0, 0.87) !important;
}*/
.theme--light.v-list-item--active::before{
  background: none !important;
}
/*.v-application .deep-purple--text.text--accent-4{
  color: rgba(0, 0, 0, 0.87) !important;
}*/
.active_class{
  color: #6200ea !important;
  background: #673ab72b !important;
}
</style>
<script>

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    group: ''
  }),
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  }
}
</script>
