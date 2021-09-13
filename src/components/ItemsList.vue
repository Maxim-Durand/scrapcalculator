<template>
  <div>
    <div class="container px-5">
      <div class="row">
        <div class="col-sm" id="selectedItems" @drop="onDrop($event)" @dragenter.prevent @dragover.prevent>
          <!--          <div class="card-header" style="text-align: center"><h3>Selected Items</h3></div>-->
          <h3>Selected Items</h3>
          <ul>
            <li draggable="true" @dragstart="startDrag($event,item,1)" class="drag-el"
                v-for="item in this.selectedItems" :key="item.name">
              {{ item.name }} | {{ item.cost }} scraps
              <img v-on:click="removeItem($event,item,1)"
                   :src="require(`../assets/x-mark.png`)" style="min-height: 2rem;
max-height: 2rem; padding-left: 1rem;">
            </li>
          </ul>
        </div>
        <div class="col-sm" id="researchedItems" @drop="onDrop($event)" @dragenter.prevent @dragover.prevent>
          <h3>Researched items</h3>
          <ul>
            <li draggable="true" @dragstart="startDrag($event,item,2)" class="drag-el" v-for="item in researchedItems"
                :key="item.name">
              {{ item.name }} | {{ item.cost }} scraps
              <img v-on:click="removeItem($event,item,2)"
                  :src="require(`../assets/x-mark.png`)" style="min-height: 2rem;
max-height: 2rem; padding-left: 1rem;">
            </li>

          </ul>
        </div>
      </div>
    </div>

    <h2>Total cost</h2>
    <h2>{{ this.totalCost }}</h2>
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
        const cost = shared.computeCost(this.pathItems, this.researchedItems)
        this.$emit("cost-change", cost)
        return cost
      },
      set: function (newValue) {
        console.log("setter")
        return newValue
      }
    }
  },
  methods: {
    startDrag(event, item, from_list) {
      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.effectAllowed = "move"
      const item_str = JSON.stringify(item)
      event.dataTransfer.setData("item", item_str)
      event.dataTransfer.setData("from_list", from_list)
    },
    onDrop(event) {
      const item_str = event.dataTransfer.getData("item")
      const item = JSON.parse(item_str)
      const from_list = event.dataTransfer.getData("from_list")
      if (from_list == 1) {
        const item_index = this.selectedItems.findIndex((elem) => {
          return elem.name === item.name
        })
        this.selectedItems.splice(item_index, 1)
        this.researchedItems.push(item)
        this.$emit("fromSelectedToResearched", item_str)
      } else {
        const item_index = this.researchedItems.findIndex((elem) => {
          return elem.name === item.name
        })
        this.researchedItems.splice(item_index, 1)
        this.selectedItems.push(item)
        this.$emit("fromResearchedToSelected", item_str)
      }
    },

    removeItem(evt,item,from_list){
      const item_str = JSON.stringify(item)
      if(from_list === 1){
        // From selected
        const item_index = this.selectedItems.findIndex((elem) => {
          return elem.name === item.name
        })
        this.selectedItems.splice(item_index, 1)
      }
      else{
        const item_index = this.researchedItems.findIndex((elem) => {
          return elem.name === item.name
        })
        this.researchedItems.splice(item_index, 1)
      }
      this.$emit("deletedItemFromLists",item_str)
    }

  }
}
</script>

<style scoped>
.col-sm {

  width: 50%;
  margin: 50px auto;
  padding: 10px;
  min-height: 10px;
}

.drag-el {
  background-color: #373631;
  color: white;
  padding: 0.75rem;
  margin-top: 0.75rem;
}
</style>