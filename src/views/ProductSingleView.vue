<template>
  <div class="products">

    <h4>{{ item.title }}</h4>
    <p>{{ item.price }}</p>

    <div class="row">
      <div class="col s6">
        <h5>Buy</h5>
        <table>
          <tr>
            <th>Station</th>
            <th>Rate</th>
            <th>Count</th>
          </tr>
          <tr v-for="item2 of stationsBuy">
            <td>
              <router-link :to="{name: 'stations', query: { name: item2.title.split(' (')[0].trim() }}">
                {{ item2.title }}
              </router-link>
            </td>
            <td>{{ item2.productByStation.rate }}</td>
            <td>{{ item2.productByStation.count }}</td>
          </tr>
        </table>

      </div>
      <div class="col s6">
        <h5>Cell</h5>
        <table>
          <tr>
            <th>Station</th>
            <th>Rate</th>
          </tr>
          <tr v-for="item2 of stationsCell">
            <td>
              <router-link :to="{name: 'stations', query: { name: item2.title.split(' (')[0].trim() }}">
                {{ item2.title }}
              </router-link>
            </td>
            <td>{{ item2.productByStation.rate }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Product, products} from "@/products";
import {Station} from "@/station";

function emptyProduct(): Product {
  return {
    title: '',
    price: '0',
    desc: '',
  }
}

@Options({
  components: {},
  watch: {},
})
export default class ProductSingleView extends Vue {
  item: Product = emptyProduct();


  mounted() {
    const prices: { [x in string]: number } = JSON.parse(localStorage.getItem('prices') ?? '[]')

    const product: Product | undefined = products.find(e => e.title == this.$route.query.name);

    this.item = {
      title: product?.title ?? '',
      price: prices[product?.title ?? '']?.toString(),
      desc: product?.desc,
    }
  }

  stations: Station[] = JSON.parse(localStorage.getItem('stations') ?? '[]')

  get stationsBuy() {
    return this.stations.filter(e => e.products.find(e2 => e2.product == this.item.title)).map(e => ({
      title: e.title,
      productByStation: e.products.find(e2 => e2.product == this.item.title)
    }));
  }

  get stationsCell() {
    return this.stations.filter(e => e.cell.find(e2 => e2.product == this.item.title)).map(e => ({
      title: e.title,
      productByStation: e.cell.find(e2 => e2.product == this.item.title)
    }))
  }

  selectText(e: any) {
    e.target.select();
  }

  search = ''
}
</script>
