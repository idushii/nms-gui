<template>
  <div class="products">
    <table>
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Desc</th>
      </tr>
      <tr v-for="item of products">
        <td> {{item.title}} </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {products} from "@/products";

@Options({
  components: {
  },
})
export default class ProductsView extends Vue {
  get products() {
    return products;
  }
}
</script>
