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
                :src="node.imagePath"
                style="width: auto; height: auto; border-radius: 10px;"
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
import TechTreeComponent from "@/components/TechTreeComponent.vue";
import VueTree from '@ssthouse/vue-tree-chart'
Vue.component('vue-tree', VueTree)
@Component({
  components: {
    TechTreeComponent,
  },
})
export default class Calculator extends Vue {

  data(){
    return {
      tier3:{
        name:'Reinforced Glass Window',
        cost: 1,
        imagePath:'src/assets/tier3/wall-window-bars-toptier.png',
        children:[
          {
            name:'Armored Door',
            cost:1,
            imagePath:'src/assets/tier3/door.hinged.toptier.png',
            children:[
              {
                name:'Armored Double Door',
                cost:1,
                imagePath:'src/assets/tier3/door.double.hinged.toptier.png',
              }
            ]
          },
          {
            name:'MP5A4',
            cost:1,
            imagePath: "src/assets/tier3/smg.mp5.png",
            children:[
              // TODO Complete with all childrens
            ]
          },
          {
            name: "High Quality Carburetor",
            cost:1,
            imagePath: "src/assets/tier3/carburetor3.png",
            children: [
              {
                name:"Armored Cockpit Vehicule Module",
                cost:1,
                imagePath:"src/assets/tier3/vehicle.1mod.cockpit.armored.png"
              }
            ]
          },
        ]
      },
      treeConfig:{
        nodeWidth: 120, nodeHeight: 80, levelHeight: 200
      }
    }
  }

}
</script>
<style>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}
</style>