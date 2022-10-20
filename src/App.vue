<template>
  <nav>
    <div class="nav-wrapper">
      <RouterLink to="/"> &nbsp; &nbsp; NMS-GUI</RouterLink>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/products">Products</RouterLink></li>
        <li><RouterLink to="/repair-ship">Repair ship</RouterLink></li>
        <li><RouterLink to="/stations">Stations</RouterLink></li>
      </ul>
    </div>
  </nav>
  <router-view class="page"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import M from 'materialize-css'

@Options({
  components: {
  },
})
export default class HomeView extends Vue {
  mounted () {
    M.AutoInit()
  }
}
</script>


<style lang="scss">
.page {
  padding: 0 1rem;
}

.count-input {
  width: 50px;
  border: none;
  text-align: center;
  padding: 10px 1rem;
}

</style>
