<template>
  <div>
    <h1>
      This is the first page of our scrap Calculator for Rust for easy tech tree scrap calculations!
    </h1>
    <div class="container">
      <vue-tree
          :dataset="tier3"
          :config="treeConfig"
      >
        <template v-slot:node="{ node, collapsed }">
          <div
              class="rich-media-node"
              :style="{ border: collapsed ? '2px solid grey' : '' }"
          >
            <img
                :src="require(`../assets/tier3/${node.imagePath}`)"
                style="width: 10rem; height: 10rem; border-radius: 10px;"
            />
            <span style="padding: 4px 0; font-weight: bold;"
            >{{ node.name }}</span
            >
          </div>
        </template>

      </vue-tree>
    </div>
  </div>


</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueTree from '@ssthouse/vue-tree-chart';
Vue.component('vue-tree', VueTree)
@Component({
  components: {

  },
})
export default class Calculator extends Vue {

  data(){
    return {
      tier3:{
        name:'Reinforced Glass Window',
        cost: 1,
        imagePath:'wall-window-bars-toptier.png',
        children:[
          {
            name:'Armored Door',
            cost:1,
            imagePath:'door.hinged.toptier.png',
            children:[
              {
                name:'Armored Double Door',
                cost:1,
                imagePath:'door.double.hinged.toptier.png',
              }
            ]
          },
          {
            name:'MP5A4',
            cost:1,
            imagePath: "smg.mp5.png",
            children:[
              // TODO Complete with all childrens
            ]
          },
          {
            name: "High Quality Carburetor",
            cost:1,
            imagePath: "carburetor3.png",
            children: [
              {
                name:"Armored Cockpit Vehicule Module",
                cost:1,
                imagePath:"vehicle.1mod.cockpit.armored.png"
              }
            ]
          },
        ]
      },
      treeConfig:{
        nodeWidth: 200, nodeHeight: 80, levelHeight: 200
      }
    }
  }

}
</script>
<style>
.container{
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rich-media-node {
  width: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #373631;
  border-radius: 4px;
}
</style>