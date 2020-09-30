<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <span class="ml-4" style="font-size:18px;"><strong v-if="cId > 0">Edit Category</strong><strong v-else>Add Category</strong></span>
        <v-btn class="float-right mr-4" :to="{name:'Category'}" dark color="indigo">
          <v-icon left>
            mdi-keyboard-backspace
          </v-icon>
          Back
        </v-btn>
      </v-col>
    </v-row>
    <v-form style="margin: 17px;" ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Category Name" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" align="center">
          <v-btn :disabled="!valid" dark color="indigo" class="mr-4" @click="validate">
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
import domain from '../domain_config.js'
export default {
  data () {
    return {
      valid: false,
      name: '',
      cId: this.$route.params.cId,
      savecategory: {
        name: ''
      },
      nameRules: [
        v => !!v || 'Category Name is required',
        v => (v && v.length <= 20) || 'Category Name must be less than 20 characters'
      ],
      errors: null
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.savecategory.name = this.name
        if (this.cId > 0) {
          this.savecategory.action = 'edit_category'
          this.savecategory.id = this.cId
        } else {
          this.savecategory.action = 'add_category'
        }
        axios.post(domain.endpoint + 'addcategory.php', this.savecategory).then(response => {
          this.$router.push({ name: 'Category' })
        }).catch(error => {
          console.log(error.response)
        })
      }
    }
  },
  mounted: function () {
    if (this.$route.params.cId > 0) {
      axios.get(domain.endpoint + 'index.php?id=' + this.$route.params.cId).then(categoryResponse => {
        if (categoryResponse.data.success) {
          this.name = categoryResponse.data.success[0].name
        } else {
          console.log(categoryResponse.data.error)
        }
      }).catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>
