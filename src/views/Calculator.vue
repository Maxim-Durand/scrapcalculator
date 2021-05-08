<template>
  <div>
    <h1>
      This is the first page of our scrap Calculator for Rust for easy tech tree scrap calculations!
    </h1>
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
              v-on:click="clickOnceOnNode($event,node.cost)"
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

Vue.component('vue-tree', VueTree)

@Component
export default class Calculator extends Vue {

  data() {
    return {
      tier3: {
        name: 'Reinforced Glass Window',
        cost: 1,
        imagePath: 'wall-window-bars-toptier.png',
        children: [
          {
            name: 'Armored Door',
            cost: 1,
            imagePath: 'door.hinged.toptier.png',
            children: [
              {
                name: 'Armored Double Door',
                cost: 1,
                imagePath: 'door.double.hinged.toptier.png',
              }
            ]
          },
          {
            name: 'MP5A4',
            cost: 1,
            imagePath: "smg.mp5.png",
            children: [
              {
                name: "Weapon Lasersight",
                imagePath: "weapon.mod.lasersight.png",
                cost: 1,
                children: [
                  {
                    name: "HV 5.56 Rifle Ammo",
                    imagePath: "ammo.rifle.hv.png",
                    cost: 1,
                    children: [
                      {
                        name: "Explosive 5.56 Rifle Ammo",
                        imagePath: "ammo.rifle.explosive.png",
                        cost: 1,
                        children: [
                          {
                            name: "Metal Facemask",
                            imagePath: "metal.facemask.png",
                            customID: 6,
                          }
                        ]
                      },
                      {
                        name: "Incendiary 5.56 Rifle Ammo",
                        imagePath: "ammo.rifle.incendiary.png",
                        cost: 1,
                        children: [

                          {
                            name: "Metal Chest Plate",
                            imagePath: "metal.plate.torso.png",
                            cost: 1,
                            children: [
                              {
                                name: "Assault Rifle",
                                imagePath: "rifle.ak.png",
                                cost: 1,
                                customID: 7,
                                children: [
                                  {
                                    name: "Bolt Action Rifle",
                                    imagePath: "rifle.bolt.png",
                                    cost: 1,
                                    children: [
                                      {
                                        name: "x8 Scope",
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
                            cost: 1,
                            children: [
                              {
                                name: "Timed Explosives",
                                imagePath: "explosive.timed.png",
                                cost: 1,
                                children: [
                                  {
                                    name: "Rocket",
                                    imagePath: "ammo.rocket.basic.png",
                                    cost: 1
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
            cost: 1,
            customID: 3,
            imagePath: "carburetor3.png"
          },
          {
            name: "Crankshaft",
            cost: 1,
            customID: 1,
            imagePath: "crankshaft3.png",
          },
          {
            name: "High quality pistons",
            imagePath: "piston3.png",
            cost: 1,
            customID: 4
          },
          {
            name: "High Quality Spark Plugs",
            imagePath: "sparkplug3.png",
            cost: 1,
            children: [
              {
                name: "Armored Cockpit Vehicule Module",
                cost: 1,
                customID: 0,
                imagePath: "vehicle.1mod.cockpit.armored.png"
              },
              {
                name: "Armored Passenger Vehicule Module",
                cost: 1,
                customID: 0,
                imagePath: "vehicle.1mod.passengers.armored.png"
              }
            ]
          },
          {
            name: "Valve",
            cost: 1,
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
      totalCost:0,
    }
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

  clickOnceOnNode(evt,node_cost) {
    console.log(evt)

    let previousStyle = evt.target.parentElement.attributes[1].value
    let style = this.nodeStyle("white")
    if (previousStyle.includes("white")) {
      style = this.nodeStyle("green")
      this.$data.totalCost -= node_cost
    }
    if (previousStyle.includes("green")) {
      style = this.nodeStyle("transparent")
    }
    if(style.includes("white")){
      // TODO Build the tree search where cost is incremented at every children until you reach this node
      // this.$data.totalCost += node_cost
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