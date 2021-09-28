<template>
  <div>
    <div class="select-container">

      <v-select
          @input="changeTier"
          class="v-select"

          :options="this.$data.tierArray"
          :value="$store.state.tierSelected"
      ></v-select>
    </div>


    <items-list v-bind:selected-items="this.$data.selectedItems" v-bind:researched-items="this.$data.researchedItems"
                v-bind:path-items="this.$data.pathItems" v-on:cost-change="onCostChange"
                v-on:fromSelectedToResearched="fromSelectedtoResearched"
                v-on:fromResearchedToSelected="fromReasearchedtoSelected"
                v-on:deletedItemFromLists="onDeleteItemFromLists"
    >

    </items-list>
    <div class="container">
      <vue-tree
          :dataset=this.$data[this.selectedTier]
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
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import VueTree from '@ssthouse/vue-tree-chart';
import * as d3 from 'd3'
import ItemsList from "@/components/ItemsList.vue";
import shared from "@/shared";
import tier3_data from '@/assets/gists/tier3.json'
import tier1_data from '@/assets/gists/tier1.json'
Vue.component('v-select', vSelect)

Vue.component('vue-tree', VueTree)
@Component({
  components: {ItemsList}
})
export default class Calculator extends Vue {

  data() {
    return {
      d3,
      tierArray: ["tier1", "tier2", "tier3"],
      tier3: tier3_data,
      tier1: tier1_data,
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

  get selectedTier() {
    return this.$store.state.tierSelected
  }

  changeTier(value) {
    this.$store.commit('changeTier', value)
  }

  onCostChange(evt) {
    //console.log(evt)
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

  /*
  changeTier(evt,tier){
    let chosen_tier = "tier1"
    switch (tier){
      case 2:
        chosen_tier="tier2"
            break
      case 3:
        chosen_tier="tier3"
            break
    }
    this.$store.commit("changeTier",chosen_tier)
  }*/


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

    let tree = d3.hierarchy(this.$data[this.selectedTier])
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
    const root_name = this.$data[this.selectedTier]
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

  fromSelectedtoResearched(item_str: string) {
    const item = JSON.parse(item_str)
    const node = this.findD3Node(item['name'])
    node['parentElement'].setAttribute("style", this.getNodeStyle("green"))
    this.computePath()
  }

  fromReasearchedtoSelected(item_str: string) {
    const item = JSON.parse(item_str)
    const node = this.findD3Node(item['name'])
    node['parentElement'].setAttribute("style", this.getNodeStyle("white"))
    this.computePath()
  }


  findParentsFromLink(d3_hierarchy, child_customID: number) {
    const tier = this.$data[this.selectedTier]
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

  onDeleteItemFromLists(item_str: string) {
    const item = JSON.parse(item_str)
    const node = this.findD3Node(item['name'])
    node['parentElement'].setAttribute("style", this.getNodeStyle("transparent"))
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

.v-select .vs__search::placeholder,
.v-select .vs__dropdown-toggle,
.v-select .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.v-select .vs__clear,
.v-select .vs__open-indicator {
  fill: #394066;
}

.select-container{
  display: inline-flex;
}

</style>