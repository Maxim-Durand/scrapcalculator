<template>
  <div>
    <h1>
      Tier : {{ this.$data.selectedTier }}
    </h1>

    <items-list v-bind:selected-items="this.$data.selectedItems" v-bind:researched-items="this.$data.researchedItems"
                v-bind:path-items="this.$data.pathItems" v-on:cost-change="onCostChange"
                v-on:fromSelectedToResearched="fromSelectedtoResearched"
                v-on:fromResearchedToSelected="fromReasearchedtoSelected"
                v-on:deletedItemFromLists="onDeleteItemFromLists"
    >

    </items-list>
    <div class="container">
      <vue-tree
          :dataset="tier3"
          :config="treeConfig"
          link-style='straight'
          :collapse-enabled="false"
      >
        <template v-slot:node="{ node }">
          <div v-on:click="clickOnceOnNode($event,node)"
               style="border: transparent"
          >
            <div
                class="rich-media-node"
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
import shared from "@/shared";

Vue.component('vue-tree', VueTree)
@Component({
  components: {ItemsList}
})
export default class Calculator extends Vue {

  data() {
    return {
      d3,
      selectedTier: "tier3",
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
        links: [{parent: 1, child: 0}, {parent: 2, child: 0}, {parent: 3, child: 0}, {parent: 4, child: 0},
          {parent: 5, child: 0}, {parent: 6, child: 7}],
        identifier: "customID"
      },
      tier1: {},
      tier2: {},
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

  getNodeStyle(color) {
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
    if (start_node.data.name === end_name) {
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

  shortestAndCheapestPath(startNode, end) {
    var start = startNode,
        ancestor = this.leastCommonAncestor(start, end),
        nodes = [start];
    while (start !== ancestor) {
      start = start.parent;
      nodes.push(start);
    }
    var k = nodes.length;
    while (end !== ancestor) {
      let chosen_parent = end.parent
      nodes.splice(k, 0, end);
      if (end.data.customID !== undefined) {
        const other_parents = this.findParentsFromLink(startNode, end.data.customID)
        for (const parent of other_parents) {
          // Find the leastCommonAncestor and compute path between LCA and other parents
          // Then compare the cost of those other path to the cost of the default path
          const lca = this.leastCommonAncestor(end.parent, parent)
          const new_path = this.shortestAndCheapestPath(lca, parent)
          const old_path = this.shortestAndCheapestPath(lca, end.parent)
          const new_cost = shared.computeCost(new_path, this.$data.researchedItems)
          const old_cost = shared.computeCost(old_path, this.$data.researchedItems)
          if (new_cost < old_cost) {
            chosen_parent = parent
          }
        }
      }
      end = chosen_parent;
    }
    return nodes;
  }

  leastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = a.ancestors(),
        bNodes = b.ancestors(),
        c = null;
    a = aNodes.pop();
    b = bNodes.pop();
    while (a === b) {
      c = a;
      a = aNodes.pop();
      b = bNodes.pop();
    }
    return c;
  }

  computePath() {

    // Add a way to compute path with special links

    let tree = d3.hierarchy(this.$data[this.$data.selectedTier])
    // console.log(tree)
    // console.log(end_node)
    let start_node = tree
    this.$data.pathItems = []
    for (const item of this.$data.selectedItems) {
      let endNode = this.recursive_find(start_node, item.name)
      let shortest_path = this.shortestAndCheapestPath(start_node, endNode)
      for (const node of shortest_path) {
        // Check that this node isn't already in our path
        const is_in_path = this.$data.pathItems.find((n) => {
          return n.data.name == node.data.name
        })
        if (is_in_path === undefined) {
          // It's not already in the pathItems
          this.$data.pathItems.push(node)
          /*if (item.customID) {
            console.log("has a customID then must be minimizedCost")
            this.linksMinimizeCostFromNode(tree, item.customID, item)

          }*/
        }
        // cost += node.data.cost
      }
    }

  }

  clickOnceOnNode(evt, node) {
    const root_name = this.$data[this.$data.selectedTier]
    const target_tag = evt.target.nodeName
    let previousStyle
    if (target_tag == "IMG" || target_tag == "SPAN") {
      previousStyle = evt.target.parentElement.parentElement.attributes[0].value
      evt.stopImmediatePropagation()
    } else {
      previousStyle = evt.target.parentElement.attributes[0].value
    }
    let style = this.getNodeStyle("white")
    if (previousStyle.includes("white")) {
      style = this.getNodeStyle("green")
      this.$data.researchedItems.push(node)
      const idx = this.$data.selectedItems.findIndex((n) => {
        return n.name === node.name
      })
      this.$data.selectedItems.splice(idx, 1)
      /*if (node.name !== root_name) {*/
      this.computePath()
      // }
    }
    if (previousStyle.includes("green")) {
      const idx = this.$data.researchedItems.findIndex((n) => {
        return n.name === node.name
      })
      this.$data.researchedItems.splice(idx, 1)
      style = this.getNodeStyle("transparent")
    }
    if (style.includes("white")) {
      this.$data.selectedItems.push(node)
      if (node.name != root_name) {
        this.computePath()
      } else {
        if (this.$data.selectedItems.length === 1) {
          this.$data.pathItems.push({
            data: {
              name: root_name,
              cost: this.$data.tier3.cost
            }
          }) // In the case where it's only root
        }
      }
    }
    if (target_tag == "IMG" || target_tag == "SPAN") {
      evt.target.parentElement.parentElement.setAttribute("style", style)
    } else {
      evt.target.parentElement.setAttribute("style", style)
    }

  }

  findD3Node(item_name) {
    const all_nodes = d3.selectAll(".rich-media-node")
    let item
    for (const node of all_nodes.nodes()) {
      if (node) {
        const span_value = node["childNodes"][1]["innerText"]
        if (span_value === item_name) {
          item = node
        }
      }
    }
    return item

    /*.select(function () {
  const span = this.childNodes[1]
  if(span == item_name){
    return this
  }
})*/
  }

  fromSelectedtoResearched(item_str:string) {
    const item = JSON.parse(item_str)
    const node = this.findD3Node(item['name'])
    node['parentElement'].setAttribute("style",this.getNodeStyle("green"))
    this.computePath()
  }

  fromReasearchedtoSelected(item_str:string) {
    const item = JSON.parse(item_str)
    const node = this.findD3Node(item['name'])
    node['parentElement'].setAttribute("style",this.getNodeStyle("white"))
    this.computePath()
  }



  findParentsFromLink(d3_hierarchy, child_customID: number) {
    const tier = this.$data[this.$data.selectedTier]
    const links = tier["links"]
    const parent_customID: number[] = []
    for (const link of links) {
      if (link['child'] === child_customID) {
        parent_customID.push(link['parent'])
      }
    }
    let bellow_root_nodes = d3_hierarchy.descendants()
    const all_parents: any[] = []
    for (const node of bellow_root_nodes) {
      if (node.data.customID) {
        for (const id of parent_customID) {
          if (node.data.customID === id) {
            all_parents.push(node)
          }
        }

      }
    }
    return all_parents

  }

  onDeleteItemFromLists(item_str:string){
    const item = JSON.parse(item_str)
    const node = this.findD3Node(item['name'])
    node['parentElement'].setAttribute("style",this.getNodeStyle("transparent"))
    this.computePath()
  }

  mounted() {
    return
  }

}
</script>
<style>

:root {
  --border-size: 3px;
  --border-color: transparent;
}

body {
  background: #5c5853;
  /* background: url("../../src/assets/rust-background.png");*/
  background-repeat: revert;
}

.tree-container {
  height: 120rem;
}

.container {
  display: contents;
  flex-direction: column;
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