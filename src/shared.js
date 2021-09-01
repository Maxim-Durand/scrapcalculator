export default {
    computeCost : function (pathItems,researchedItems){
        let cost = 0
        for (const item of pathItems) {
            cost += item.data.cost
        }
        for (const item of researchedItems) {
            if (pathItems.filter((item_in_path) => {
                return item_in_path.data.name === item.name
            }).length !== 0) {
                cost -= item.cost
            }
        }
        cost = cost < 0 ? 0 : cost
        return cost
    }
}