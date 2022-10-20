<template>
  <div class="stations">
    <br>
    <table>
      <tr>
        <th>Title</th>
        <th>Type</th>
        <th>Level</th>
        <th>Danger</th>
        <th>Action</th>
      </tr>
      <tr v-for="item of stations" @click="handleSelect(item)">
        <td>{{ item.title }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.level }}</td>
        <td>{{ item.danger }}</td>
        <td style="width: 100px;"><a class="waves-effect waves-light btn" @click="removeStation(item)">-</a></td>
      </tr>
    </table>

    <br>
    <div v-if="selectStation.uid">
      <hr>

      <div class="row">
        <div class="input-field col s4">
          <input id="title" type="text" class="validate" v-model="selectStation.title" placeholder="Title">
        </div>
        <div class="input-field col s2">
          <input id="Type" type="text" class="validate" v-model="selectStation.level" placeholder="Level">
        </div>
        <div class="input-field col s2">
          <input list="type" type="text" class="validate" v-model="selectStation.type" placeholder="Type">
          <datalist id="type">
            <option>Продвинутые материалы</option>
            <option>Производство</option>
            <option>Производство энергии</option>
            <option>Научный</option>
            <option>Технология</option>
            <option>Торговля</option>
            <option>Минералы</option>
          </datalist>
        </div>
        <div class="input-field col s2">
          <input list="danger" type="text" class="validate" v-model="selectStation.danger" placeholder="Danger">
          <datalist id="danger">
            <option>Низкий уровень конфликта</option>
            <option>Беспокойная</option>
            <option>Нерегулярные</option>
            <option>Обостренная</option>
            <option>Высокий уровень конфликта</option>
          </datalist>

        </div>
        <div class="input-field col s2">
          <input list="rasa" type="text" class="validate" v-model="selectStation.rasa" placeholder="Rasa">
          <datalist id="rasa">
            <option>Геки</option>
            <option>Вай`кины</option>
            <option>Вайкни</option>
          </datalist>
        </div>
      </div>

      <table class="table-repair">
        <tr>
          <th>Product cell</th>
          <th style="width: 70px;">Rate</th>
          <th style="width: 70px;">Price</th>
          <th style="width: 70px;">Action</th>
        </tr>
        <tr v-for="(item, index) of selectStation.cell">
          <td>
            <input :list="`selectProduct-${index}`" type="text" class="browser-default count-input selectProduct"
                   v-model="item.product"
                   @click="selectText">

            <datalist :id="`selectProduct-${index}`">
              <option v-for="item of products">{{ item.title }}</option>
            </datalist>

          </td>
          <td><input type="text" class="browser-default count-input" v-model="item.rate" @click="selectText"></td>
          <td>{{(getPrice(item.product) * (100 + Number(item.rate)) / 100).toLocaleString('ru-RU')}}</td>
          <td style="width: 100px;"><a class="waves-effect waves-light btn" @click="removeCell(item)">-</a></td>
        </tr>
      </table>

      <br>
      <br>

      <table class="table-repair">
        <tr>
          <th>Product</th>
          <th style="width: 70px;">Rate</th>
          <th style="width: 70px;">Count</th>
          <th style="width: 70px;">Price</th>
          <th style="width: 70px;">Action</th>
        </tr>
        <tr v-for="(item, index) of selectStation.products">
          <td>
            <input :list="`selectProduct-${index}`" type="text" class="browser-default count-input selectProduct"
                   v-model="item.product"
                   @click="selectText">

            <datalist :id="`selectProduct-${index}`">
              <option v-for="item of products">{{ item.title }}</option>
            </datalist>

          </td>
          <td><input type="text" class="browser-default count-input" v-model="item.rate" @click="selectText"></td>
          <td><input type="text" class="browser-default count-input" v-model="item.count" @click="selectText"></td>
          <td>{{(getPrice(item.product) * (100 + Number(item.rate)) / 100).toLocaleString('ru-RU')}}</td>
          <td>{{
              (item.count * (getPrice(item.product)) * Number(100 + Number(item.rate)) / 100).toLocaleString('ru-RU')
            }}
          </td>
          <td style="width: 100px;"><a class="waves-effect waves-light btn" @click="removeProduct(item)">-</a></td>
        </tr>
      </table>

    </div>
  </div>

  <floating-btn @click="addStation">+</floating-btn>

  <br>
  <br>

  <br>
  <br>

  <br>
  <br>

  <br>
  <br>


</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {RepairShip, repairShip} from "@/repairShip";
import FloatingBtn from "@/components/FloatingBtn.vue";
import M from "materialize-css";
import {Station, StationProduct} from "@/station";
import {Product, products} from "@/products";

@Options({
  components: {FloatingBtn},
  watch: {
    stations: {
      deep: true,
      handler: function (value) {
        localStorage.setItem('stations', JSON.stringify(value))
      }
    },
    selectStation: {
      deep: true,
      handler: function (value: Station) {
        var lastProduct = value.products[value.products.length - 1]
        if (lastProduct.product != '') {
          value.products.push(emptyProduct())
        }
        var lastCell = value.cell[value.cell.length - 1]
        if (lastCell.product != '') {
          value.cell.push(emptyProduct())
        }
      }
    },
  }
})
export default class StationsView extends Vue {
  stations: Station[] = []

  get products() {
    return products;
  }

  mounted() {
    this.stations = JSON.parse(localStorage.getItem('stations') ?? '[]')

    if (this.$route.query && this.stations.find(e => e.title == this.$route.query.name)) {
      //@ts-ignore
      this.selectStation = this.stations.find(e => e.title == this.$route.query.name)
    }
  }

  selectStation: Station = {
    uid: 0,
    title: '',
    type: '',
    danger: '',
    rasa: '',
    level: 1,
    products: [],
    cell: [],
  }

  addStation() {
    this.selectStation = this.emptyStations();

    this.stations.push(this.selectStation)
  }

  removeStation(item: Station) {
    var index = this.stations.indexOf(item)
    this.stations.splice(index, 1)
    this.selectStation.uid = 0
    this.selectStation = this.emptyStations()
  }

  emptyStations(): Station {
    return {
      uid: Math.random(),
      title: '',
      type: '',
      danger: '',
      level: 1,
      rasa: '',
      products: [emptyProduct()],
      cell: [emptyProduct()],
    };
  }

  selectText(e: any) {
    e.target.select();
  }

  handleSelect(item: Station) {
    this.selectStation = item

    this.$router.push({query: {name: item.title}})

    setTimeout(() => {
      M.AutoInit()
      M.updateTextFields();

      var res: { [x in string]: null } = {}

      for (let item of products) {
        res[item.title] = null;
      }
    }, 300)

  }

  removeProduct(item: StationProduct) {
    var index = this.selectStation.products.indexOf(item)
    this.selectStation.products.splice(index, 1)
  }

  removeCell(item: StationProduct) {
    var index = this.selectStation.cell.indexOf(item)
    this.selectStation.cell.splice(index, 1)
  }


  prices = JSON.parse(localStorage.getItem('prices') ?? '[]')

  getPrice(product: string) {
    var res = this.prices[product]
    if (!res) return 0;

    return res;
  }
}

function emptyProduct(): StationProduct {
  return {
    product: '',
    count: 0,
    price: 0,
    rate: 0,
  }
}


</script>

<style lang="scss" scoped>

.selectProduct {
  width: 100% !important;
  text-align: left;
}

.table-repair {
  td {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>