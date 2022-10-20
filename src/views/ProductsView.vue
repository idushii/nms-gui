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
        <th>Buy</th>
        <th>Cell</th>
      </tr>
      <tr v-for="item of products">
        <td> {{ item.title }}</td>
        <td><input type="text" class="browser-default count-input" v-model="prices[item.title]" @click="selectText"></td>
        <td>
          <router-link v-for="station of getStationsBuy(item.title)" :to="{name: 'stations', query: {name: station.split(' (')[0]}}"> {{station}} </router-link>
        </td>
        <td>
          <router-link v-for="station of getStationsCell(item.title)" :to="{name: 'stations', query: {name: station.split(' (')[0]}}"> {{station}} </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Product, products} from "@/products";
import {Station} from "@/station";

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

  stations: Station[] = JSON.parse(localStorage.getItem('stations') ?? '[]')

  getStationsBuy(product: string) {
    return this.stations.filter(e => e.products.find(e2 => e2.product == product)).map(e => `${e.title} (${e.products.find(e2 => e2.product == product)?.count})`)
  }

  getStationsCell(product: string) {
    return this.stations.filter(e => e.cell.find(e2 => e2.product == product)).map(e => `${e.title} `)
  }

  selectText(e: any) {
    e.target.select();
  }

  search = ''
}
</script>
