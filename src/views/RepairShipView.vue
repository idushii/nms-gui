<template>
  <div class="products">
    <br>
    <table>
      <tr>
        <th>Title</th>
        <th>Type</th>
        <th>Count cells</th>
        <th>Action</th>
      </tr>
      <tr v-for="item of ships" @click="handleSelect(item)">
        <td>{{item.title}}</td>
        <td>{{item.type}}</td>
        <td>{{item.cells}}</td>
        <td style="width: 100px;"><a class="waves-effect waves-light btn" @click="removeShip(item)">-</a></td>
      </tr>
    </table>

    <br>

    <div class="row" v-if="selectShip.uid">
      <div class="input-field col s6">
        <input id="title" type="text" class="validate" v-model="selectShip.title" placeholder="Title">
      </div>
      <div class="input-field col s4">
        <input id="Type" type="text" class="validate" v-model="selectShip.type" placeholder="Type">
      </div>
      <div class="input-field col s2">
        <input id="Cells" type="text" class="validate" v-model="selectShip.cells" placeholder="Cells">
      </div>
    </div>


    <table v-if="selectShip.uid" class="table-repair">
      <tr>
        <th>Title</th>
        <th>Count</th>
        <th>Product 1</th>
        <th>Product 2</th>
        <th>Product 3</th>
      </tr>
      <tr v-for="item of repairShip">
        <td> {{ item.title }}</td>
        <td><input type="text" class="browser-default count-input" v-model="selectShip.repairCount[item.title]" @click="selectText"></td>
        <td v-for="product of item.products">
          {{ product.product }} x {{ product.count * (selectShip.repairCount[item.title] ?? 1) }}
        </td>
      </tr>
    </table>
  </div>

  <floating-btn @click="addShip">+</floating-btn>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {RepairShip, repairShip} from "@/repairShip";
import FloatingBtn from "@/components/FloatingBtn.vue";
import M from "materialize-css";

interface Ship {
  uid: number,
  title: string
  type: string
  cells: number
  repair: RepairShip[]
  repairCount: {[product in string]: number}
}

@Options({
  components: {FloatingBtn},
  watch: {
    ships: {
      deep: true,
      handler: function (value) {
        localStorage.setItem('repair-ships', JSON.stringify(value))
      }
    }
  }
})
export default class RepairShipView extends Vue {
  ships: Ship[] = []

  mounted() {
    this.ships = JSON.parse(localStorage.getItem('repair-ships') ?? '[]')

    M.AutoInit()

    M.updateTextFields();


  }

  selectShip : Ship = {
    uid: 0,
    title: '',
    type: '',
    cells: 0,
    repair: [],
    repairCount: {},
  }

  get repairShip() {
    return repairShip;
  }

  addShip() {
    this.selectShip = this.emptyShip();

    this.ships.push(this.selectShip)
  }

  removeShip(item: Ship) {
    var index = this.ships.indexOf(item)
    this.ships.splice(index, 1)
    this.selectShip.uid = 0
    this.selectShip = this.emptyShip()
  }

  emptyShip(): Ship {
    var res2: {[x in string]: number} = {};
    for(let item of repairShip) {
      res2[item.title] = 1;
    }

    return {
      uid: Math.random(),
      title: '',
      type: '',
      cells: 0,
      repair: [],
      repairCount: res2,
    };
  }

  selectText(e: any) {
    e.target.select();
  }

  handleSelect(item: Ship) {
    this.selectShip = item
  }
}
</script>

<style lang="scss" scoped>
.table-repair {
  td {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>