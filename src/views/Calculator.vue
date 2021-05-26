<template>
  <div>
    <h1>
      This is the first page of our scrap Calculator for Rust for easy tech tree scrap calculations!
    </h1>


    <items-list v-bind:selected-items="this.$data.selectedItems" v-bind:researched-items="this.$data.researchedItems"
                v-bind:path-items="this.$data.pathItems" v-on:cost-change="onCostChange">

    </items-list>
    <div class="container">
      <vue-tree
          :dataset="tier3"
          :config="treeConfig"
          link-style='straight'
          :collapse-enabled="false"
      >
        <template v-slot:node="{ node }">
          <div
              class="rich-media-node"
              v-on:click="clickOnceOnNode($event,node)"
              style="font-size: 14px;
              font-style: normal;
              border-top-width: var(--border-size);
              border-top-style: solid;
              border-left-width: var(--border-size);
              border-left-style: solid;
              border-right-width: var(--border-size);
              border-right-style: solid;
              border-bottom-width: var(--border-size);
              border-bottom-style: solid;"
          >
            <img
                :src="require(`../assets/tier3/${node.imagePath}`)"
                style="width: 5rem; height: 5rem; border-radius: 10px;"
            />
            <span style="padding: 4px 0; font-weight: bold;">{{ node.name }}</span>
          </div>
        </template>
      </vue-tree>
    </div>


  </div>


</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import VueTree from '@ssthouse/vue-tree-chart';
import * as d3 from 'd3'
import ItemsList from "@/components/ItemsList.vue";

Vue.component('vue-tree', VueTree)
@Component({
  components: {ItemsList}
})
export default class Calculator extends Vue {

  data() {
    return {
      d3,
      tier3: {
        name: 'Reinforced Glass Window',
        cost: 125,
        imagePath: 'wall-window-bars-toptier.png',
        children: [
          {
            name: 'Armored Door',
            cost: 500,
            imagePath: 'door.hinged.toptier.png',
            children: [
              {
                name: 'Armored Double Door',
                cost: 500,
                imagePath: 'door.double.hinged.toptier.png',
              }
            ]
          },
          {
            name: 'MP5A4',
            cost: 125,
            imagePath: "smg.mp5.png",
            children: [
              {
                name: "Weapon Lasersight",
                imagePath: "weapon.mod.lasersight.png",
                cost: 125,
                children: [
                  {
                    name: "HV 5.56 Rifle Ammo",
                    imagePath: "ammo.rifle.hv.png",
                    cost: 125,
                    children: [
                      {
                        name: "Explosive 5.56 Rifle Ammo",
                        imagePath: "ammo.rifle.explosive.png",
                        cost: 125,
                        children: [
                          {
                            name: "Metal Facemask",
                            cost: 500,
                            imagePath: "metal.facemask.png",
                            customID: 6,
                          }
                        ]
                      },
                      {
                        name: "Incendiary 5.56 Rifle Ammo",
                        imagePath: "ammo.rifle.incendiary.png",
                        cost: 125,
                        children: [

                          {
                            name: "Metal Chest Plate",
                            imagePath: "metal.plate.torso.png",
                            cost: 500,
                            children: [
                              {
                                name: "Assault Rifle",
                                imagePath: "rifle.ak.png",
                                cost: 500,
                                customID: 7,
                                children: [
                                  {
                                    name: "Bolt Action Rifle",
                                    imagePath: "rifle.bolt.png",
                                    cost: 500,
                                    children: [
                                      {
                                        name: "x8 Scope",
                                        cost: 125,
                                        imagePath: "weapon.mod.small.scope.png"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            name: "Explosives",
                            imagePath: "explosives.png",
                            cost: 500,
                            children: [
                              {
                                name: "Timed Explosives",
                                imagePath: "explosive.timed.png",
                                cost: 500,
                                children: [
                                  {
                                    name: "Rocket",
                                    imagePath: "ammo.rocket.basic.png",
                                    cost: 125
                                  }
                                ]
                              }
                            ]
                          },
                        ]
                      },

                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "High Quality Carburetor",
            cost: 20,
            customID: 3,
            imagePath: "carburetor3.png"
          },
          {
            name: "Crankshaft",
            cost: 20,
            customID: 1,
            imagePath: "crankshaft3.png",
          },
          {
            name: "High quality pistons",
            imagePath: "piston3.png",
            cost: 20,
            customID: 4
          },
          {
            name: "High Quality Spark Plugs",
            imagePath: "sparkplug3.png",
            cost: 20,
            children: [
              {
                name: "Armored Cockpit Vehicule Module",
                cost: 125,
                customID: 0,
                imagePath: "vehicle.1mod.cockpit.armored.png"
              },
              {
                name: "Armored Passenger Vehicule Module",
                cost: 125,
                customID: 0,
                imagePath: "vehicle.1mod.passengers.armored.png"
              }
            ]
          },
          {
            name: "Valve",
            cost: 20,
            customID: 5,
            imagePath: "valve3.png"
          },
        ],
        links: [{parent: 1, child: 0}, {parent: 2, child: 0}, {parent: 3, child: 0}, {parent: 4, child: 0}, {
          parent: 5,
          child: 0
        }, {parent: 6, child: 7}],
        identifier: "customID"
      },
      treeConfig: {
        nodeWidth: window.screen.width / 8, nodeHeight: 80, levelHeight: 200
      },
      totalCost: 0,
      pathItems: [],
      selectedItems: [],
      researchedItems: [],
    }
  }

  onCostChange(evt) {
    console.log(evt)
    this.$data.totalCost = evt
  }

  nodeStyle(color) {
    return "font-size: 14px;\n" +
        "border: " + color + ";" +
        "              font-style: normal;\n" +
        "              border-top-width: var(--border-size);\n" +
        "              border-top-style: solid;\n" +
        "              border-left-width: var(--border-size);\n" +
        "              border-left-style: solid;\n" +
        "              border-right-width: var(--border-size);\n" +
        "              border-right-style: solid;\n" +
        "              border-bottom-width: var(--border-size);\n" +
        "              border-bottom-style: solid;"
  }

  recursive_find(start_node, end_name) {
    if (start_node.name === end_name) {
      return start_node
    }
    if (start_node.children) {
      const found_at_this_height = start_node.children.find(d => {
        return d.data.name === end_name
      })
      if (found_at_this_height) {
        return found_at_this_height
      } else {
        // console.log(`didnt found it at height ${start_node.depth}`)
        for (const child of start_node.children) {
          // console.log(child)
          let found = this.recursive_find(child, end_name)
          if (found) {
            return found
          }
        }
      }
    } else {
      return undefined
    }

  }

  computePath() {

    // Add a way to compute path with special links

    let tree = d3.hierarchy(this.$data.tier3)
    // console.log(tree)
    // console.log(end_node)
    let start_node = tree
    this.$data.pathItems = []
    for (const item of this.$data.selectedItems) {
      let endNode = this.recursive_find(start_node, item.name)
      // console.log(endNode)
      let shortest_path = start_node.path(endNode)
      for (const node of shortest_path) {
        // Check that this node isn't already in our path
        const is_in_path = this.$data.pathItems.find((n) => {
          return n.data.name === node.data.name
        })
        if (is_in_path === undefined) {
          // It's not already in the pathItems
          this.$data.pathItems.push(node)
        }
        // cost += node.data.cost
      }
    }

  }

  clickOnceOnNode(evt, node) {
    /*console.log(evt)
    console.log(node)*/
    const root_name =this.$data.tier3.name

    let previousStyle = evt.target.parentElement.attributes[1].value
    let style = this.nodeStyle("white")
    if (previousStyle.includes("white")) {
      style = this.nodeStyle("green")
      this.$data.researchedItems.push(node)
      const idx = this.$data.selectedItems.findIndex((n) => {
        return n.name === node.name
      })
      this.$data.selectedItems.splice(idx, 1)
      if (node.name !== root_name) {
        this.computePath()
      }
    }
    if (previousStyle.includes("green")) {
      const idx = this.$data.researchedItems.findIndex((n) => {
        return n.name === node.name
      })
      this.$data.researchedItems.splice(idx, 1)
      style = this.nodeStyle("transparent")
    }
    if (style.includes("white")) {
      this.$data.selectedItems.push(node)
      if (node.name !== root_name) {
        this.computePath()
      }
      else{
        this.$data.pathItems.push({
          data:{
            name:root_name,
            cost:this.$data.tier3.cost
          }
        }) // In the case where it's only root
      }
    }
    evt.target.parentElement.setAttribute("style", style)
  }


}
</script>
<style>

:root {
  --border-size: 3px;
  --border-color: transparent;
}

body {
  background: url("../../src/assets/rust-background.png");
  background-repeat: revert;
}

.tree-container {
  height: 120rem;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rich-media-node {
  width: auto;
  padding: 8px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #373631;
  border: var(--border-color);
  /*border-radius: 4px;*/
}
</style>