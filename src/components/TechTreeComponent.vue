<template>
  <div class="container">
    <vue-tree
        style="width: 1000px; height: 600px; border: 1px solid gray;"
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
              style="width: 48px; height: 48px; border-raduis: 4px;"
          />
          <span style="padding: 4px 0; font-weight: bold;"
          >{{ node.name }}</span
          >
        </div>
      </template>
    </vue-tree>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
@Component
export default class TechTreeComponent extends Vue {

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
