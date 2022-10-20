<template>
  <div class="products">

    <br>
    <br>

    <input type="text" autofocus v-model="search" placeholder="Search">

    <br>
    <br>

    <table>
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Desc</th>
      </tr>
      <tr v-for="item of products">
        <td> {{ item.title }}</td>
        <td><input type="text" class="browser-default count-input" v-model="prices[item.title]" @click="selectText">
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Product, products} from "@/products";

@Options({
  components: {},
  watch: {
    prices: {
      deep: true,
      handler: function (value: any) {
        localStorage.setItem('prices', JSON.stringify(value))
      }
    },
  },
})
export default class ProductsView extends Vue {
  prices: { [x in string]: number } = {};

  mounted() {
    for (let item of products) {
      this.prices[item.title] = 0;
    }

    this.prices = JSON.parse(localStorage.getItem('prices') ?? '[]')
  }

  get products() {
    if (this.search == '')
      return products;
    else
      return products.filter(e => e.title.toLowerCase().includes(this.search.toLowerCase()))
  }

  selectText(e: any) {
    e.target.select();
  }

  search = ''
}
</script>
