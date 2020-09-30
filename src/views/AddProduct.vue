<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <span class="ml-4" style="font-size:18px;"><strong v-if="pId > 0">Edit Product Detail</strong><strong v-else>Add Product Detail</strong></span>
        <v-btn class="float-right mr-4" :to="{name:'Product'}" dark color="indigo">
          <v-icon left>
            mdi-keyboard-backspace
          </v-icon>
          Back
        </v-btn>
      </v-col>
    </v-row>
    <v-form style="margin: 17px;" ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="6" md="6">
          <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Product Name" required></v-text-field>

          <v-text-field v-model="price" :rules="priceRules" label="Price" required></v-text-field>
          <v-text-field v-model="discount" :rules="discountRules" label="Discount" required></v-text-field>
          <v-file-input v-model="image" :rules="[value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!']" accept="image/png, image/jpeg, image/bmp"  prepend-icon="mdi-camera" label="Product Image"></v-file-input>
        </v-col>
        <v-col cols="6" md="6">
          <v-select v-model="category" :items="categoryData" item-text="name" item-value="id" :rules="[v => !!v || 'Category is required']" label="Category" required></v-select>
          <!-- <v-text-field v-model="category" :rules="categoryRules" label="Category" required></v-text-field> -->
          <v-text-field v-model="netprice" :rules="netpriceRules" label="Net Price" required></v-text-field>
          <v-text-field v-model="description" label="Description" required></v-text-field>
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
      categoryData: [],
      pId: this.$route.params.pId,
      saveproduct: {
        name: '',
        category: '',
        price: '',
        discount: '',
        netprice: '',
        description: '',
        image: []
      },
      name: '',
      category: '',
      price: '',
      discount: '',
      netprice: '',
      description: '',
      image: [],
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      priceRules: [
        v => !!v || 'Price is required',
        v => (v && v.length <= 20) || 'Price must be less than 20 characters'
      ],
      discountRules: [
        v => !!v || 'Discount is required',
        v => (v && v.length <= 20) || 'Discount must be less than 20 characters'
      ],
      netpriceRules: [
        v => !!v || 'Net Price is required',
        v => (v && v.length <= 20) || 'Net Price must be less than 20 characters'
      ],
      imagerules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      errors: null
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        var formData = new FormData()
        formData.append('image', this.image)
        formData.append('name', this.name)
        formData.append('price', this.price)
        formData.append('discount', this.discount)
        formData.append('netprice', this.netprice)
        formData.append('description', this.description)
        if (this.category.id) {
          formData.append('category', this.category.id)
        } else {
          formData.append('category', this.category)
        }
        // this.saveproduct.price = this.price
        // this.saveproduct.discount = this.discount
        // this.saveproduct.netprice = this.netprice
        // this.saveproduct.description = this.description
        // this.saveproduct.image = this.image
        if (this.pId > 0) {
          formData.append('action', 'edit_product')
          formData.append('id', this.pId)
        } else {
          formData.append('action', 'add_product')
          // this.saveproduct.action = 'add_product'
        }
        axios.post(domain.endpoint + 'addproduct.php', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
          this.$router.push({ name: 'Product' })
        }).catch(error => {
          console.log(error.response)
        })
      }
    }
  },
  mounted: function () {
    axios.get(domain.endpoint + 'index.php').then(categoryResponse => {
      if (categoryResponse.data.success) {
        this.categoryData = categoryResponse.data.success
      } else {
        console.log(categoryResponse.data.error)
      }
    }).catch(error => {
      console.log(error.response)
    })
    if (this.$route.params.pId > 0) {
      axios.get(domain.endpoint + 'product.php?id=' + this.$route.params.pId).then(productResponse => {
        if (productResponse.data.success) {
          this.name = productResponse.data.success[0].pro_name
          this.category = productResponse.data.success[0].category
          this.price = productResponse.data.success[0].price
          this.discount = productResponse.data.success[0].discount
          this.netprice = productResponse.data.success[0].net_price
          this.description = productResponse.data.success[0].description
        } else {
          console.log(productResponse.data.error)
        }
      }).catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>
