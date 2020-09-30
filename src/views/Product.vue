<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <span class="ml-4" style="font-size:18px;"><strong>Product Detail</strong></span>
        <v-btn class="float-right mr-4" :to="{name:'AddProduct', params: {'pId': 0}}" dark color="indigo">
          <v-icon left>
            mdi-plus
          </v-icon>
          Add Product
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="productData"
      item-key="id"
      class="elevation-1 ml-6"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:item.action="{ item }">
        <v-btn class="mx-2" :id="item.pro_name" :to="{name:'AddProduct', params: {'pId': item.id}}" fab dark small color="cyan">
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn class="mx-2" :id="item.pro_name" @click="productView(item.id)" fab dark small color="teal">
          <v-icon dark>
            mdi-eye
          </v-icon>
        </v-btn>
        <v-btn class="mx-2" :id="item.pro_name" fab dark small color="red" @click="deleteProduct(item.id)">
          <v-icon dark>
            mdi-trash-can
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:top>
        <tr>
          <td colspan="2"><v-text-field v-model="search" label="Product and Category" class="mx-4"></v-text-field></td>
          <td><v-text-field v-model="fromprice" type="number" label="From Price" class="mx-4"></v-text-field></td>
          <td><v-text-field v-model="toprice" type="number" label="To Price" class="mx-4"></v-text-field></td>
        </tr>
      </template>
      <!-- <template v-slot:body.append>
        <tr>
          <td></td>
          <td>
            <v-text-field v-model="category" type="number" label="Less than"></v-text-field>
          </td>
          <td colspan="4"></td>
        </tr>
      </template> -->
    </v-data-table>
    <v-bottom-sheet v-model="sheet">
      <v-sheet
        height="200px"
      >
        <v-row>
          <v-col cols="12" md="12">
            <span class="ml-4" style="font-size:18px;"><strong>Product Detail</strong></span>
            <v-btn
              class="float-right"
              text
              color="red"
              @click="sheet = !sheet"
            >
              close
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" md="3" class="pb-4">
            <v-img class="ml-4 mb-4" :src="image" aspect-ratio="2"></v-img>
          </v-col>
          <v-col cols="9" md="9">
            <span class="ml-4">Product Name: {{pro_name}}</span><br/>
            <span class="ml-4">Category: {{category}}</span><br/>
            <span class="ml-4">Price: {{price}}</span><br/>
            <span class="ml-4">Discount: {{discount}}</span><br/>
            <span class="ml-4">Net Price: {{net_price}}</span><br/>
          </v-col>
        </v-row>
        <div class="py-3">
          This is a bottom sheet using the controlled by v-model instead of activator
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import axios from 'axios'
import domain from '../domain_config.js'
export default {
  data () {
    return {
      sheet: false,
      search: '',
      productData: [],
      fromprice: '',
      toprice: '',
      pro_name: '',
      category: '',
      price: '',
      discount: '',
      net_price: '',
      image: ''
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Product Name',
          align: 'start',
          sortable: false,
          value: 'pro_name'
        },
        {
          text: 'Category',
          value: 'category.name'
        },
        {
          text: 'Price',
          value: 'price',
          filter: value => {
            if (!this.fromprice || !this.toprice) return true
            return value >= parseInt(this.fromprice) && value <= parseInt(this.toprice)
          }
        },
        { text: 'Discount', value: 'discount' },
        { text: 'Net Price', value: 'net_price' },
        { text: 'Action', value: 'action' }
      ]
    }
  },
  methods: {
    filterOnlyCapsText (value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        (item.pro_name.toString().toLocaleUpperCase().indexOf(search.toString().toLocaleUpperCase()) !== -1 || item.category.name.toString().toLocaleUpperCase().indexOf(search.toString().toLocaleUpperCase()) !== -1)
    },
    deleteProduct (pid) {
      axios.post(domain.endpoint + 'deleteproduct.php', { id: pid }).then(response => {
        location.reload()
      }).catch(error => {
        console.log(error.response)
      })
    },
    productView (pid) {
      this.sheet = true
      var product = this.productData
      product.filter(id => {
        if (id.id === pid) {
          this.pro_name = id.pro_name
          this.category = id.category.name
          this.price = id.price
          this.discount = id.discount
          this.net_price = id.net_price
          this.image = id.image_link
        }
      })
      // this.pro_name
      // this.category
      // this.price
      // this.discount
      // this.net_price
      // this.image
    }
  },
  mounted: function () {
    axios.get(domain.endpoint + 'product.php').then(productResponse => {
      if (productResponse.data.success) {
        this.productData = productResponse.data.success
      } else {
        console.log(productResponse.data.error)
      }
    }).catch(error => {
      console.log(error.response)
    })
  }
}
</script>
