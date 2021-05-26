<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h3>Selected items</h3>
          <ul>
            <li v-for="item in this.selectedItems" :key="item.name">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="col-sm">
          <h3>Researched items</h3>
          <ul>
            <li v-for="item in researchedItems" :key="item.name">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <h3>Total cost</h3>
    <h4>{{ this.totalCost }}</h4>
  </div>

</template>

<script>
export default {
  name: "ItemsList",
  props: {
    selectedItems: Array,
    researchedItems: Array,
    pathItems: Array,
  },
  computed: {
    totalCost: {
      get: function () {
        let cost = 0
        console.log(this.pathItems)
        for (const item of this.pathItems) {
          cost += item.data.cost
        }
        for (const item of this.researchedItems) {
          if (item in this.pathItems) cost -= item.cost
        }
        cost = cost < 0 ? 0 : cost
        this.$emit("cost-change", cost)
        return cost
      },
      set: function (newValue){
          console.log("setter")
      }
    }
  },
}
</script>

<style scoped>

</style>