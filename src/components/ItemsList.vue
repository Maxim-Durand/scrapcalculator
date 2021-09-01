<template>
  <div>
    <div class="container px-5">
      <div class="row">
        <div class="col">
          <div class="card-header" style="text-align: center"><h3>Selected Items</h3></div>
          <div class="list-group">
            <div v-for="item in this.selectedItems" :key="item.name">
              <label class="list-group-items">{{ item.name }}</label>
            </div>
          </div>
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

import shared from "@/shared";

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
        console.log(this.pathItems)
        const cost = shared.computeCost(this.pathItems,this.researchedItems)
        this.$emit("cost-change", cost)
        return cost
      },
      set: function (newValue) {
        console.log("setter")
        return newValue
      }
    }
  },
}
</script>

<style scoped>

</style>