<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <span class="ml-4" style="font-size:18px;"><strong>Category Detail</strong></span>
        <v-btn class="float-right mx-2" :to="{name:'AddCategory', params: {'cId': 0}}" dark color="indigo">
          <v-icon left>
            mdi-plus
          </v-icon>
          Add category
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="categoryData"
      item-key="id"
      class="elevation-1 ml-6"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:item.action="{ item }">
        <v-btn class="mx-2" :id="item.name" :to="{name:'AddCategory', params: {'cId': item.id}}" fab dark small color="cyan">
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn class="mx-2" :id="item.name" fab dark small color="red" @click="deleteCategory(item.id)">
          <v-icon dark>
            mdi-trash-can
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:top>
        <v-text-field v-model="search" label="Search with category" class="mx-4"></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
import domain from '../domain_config.js'
export default {
  data () {
    return {
      search: '',
      categoryData: []
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Category Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Action', value: 'action' }
      ]
    }
  },
  methods: {
    filterOnlyCapsText (value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search.toString().toLocaleUpperCase()) !== -1
    },
    deleteCategory (cid) {
      axios.post(domain.endpoint + 'deleteCategory.php', { id: cid }).then(response => {
        location.reload()
      }).catch(error => {
        console.log(error.response)
      })
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
  }
}
</script>
