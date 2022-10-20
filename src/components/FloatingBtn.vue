<template>
  <div class="fixed-action-btn">
    <a class="btn-floating btn-large red">
      <slot></slot>
    </a>
  </div>

</template>

<script>
export default {
  name: "FloatingBtn",
  mounted() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, {});
    });
  }
}
</script>

<style scoped>

</style>