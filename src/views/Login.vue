<template>
  <div>
    <v-card elevation="1">
      <h3 class="mt-4" color="indigo" align="center">Login</h3>
      <v-form style="margin: 17px;" ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="3" md="3">
          </v-col>
          <v-col cols="6" md="6">
            <v-text-field v-model="name" label="User Name" :rules="nameRules" required></v-text-field>
            <v-text-field v-model="password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show2 ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" class="input-group--focused" @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>
          <v-col cols="3" md="3">
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12" align="center">
            <v-btn dark color="indigo" class="mr-4" @click="validate">
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show2: true,
      valid: false,
      name: 'simform',
      password: 'india123456789',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be less than 8 characters'
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ]
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        if (this.name === 'simform' && this.password === 'india123456789') {
          localStorage.setItem('is_login', true)
          location.reload()
        }
      }
    }
  }
}
</script>
