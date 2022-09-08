// import Doko, { IslandModel } from "../index.js";
// import { defineStore } from "pinia";

// export const useIslands = defineStore("doko-island", {
//   state: () => ({
//     islands: {
//       list: [] as InstanceType<Doko["services"]["Island"]>[],
//       map: {} as Record<
//         IslandModel["islandId"],
//         InstanceType<Doko["services"]["Island"]> | undefined
//       >,
//     },
//   }),
//   actions: {
//     async refresh() {
//       const res = await this.getDoko().dodo.island.getIslandList();
//       this.islands.list = res.data.data.map((island) => {
//         // 设置 island 原型，使其支持快捷操作函数。
//         Object.setPrototypeOf(island, this.getDoko().services.Island.prototype);
//         return island as unknown as InstanceType<Doko["services"]["Island"]>;
//       });
//       this.islands.map = this.islands.list.reduce((res, current) => {
//         res[current.islandId] = current;
//         return res;
//       }, {} as Record<IslandModel["islandId"], InstanceType<Doko["services"]["Island"]>>);
//     },

//     get(islandId: IslandModel["islandId"]) {
//       return this.islands.map[islandId];
//     },
//     has(islandId: IslandModel["islandId"]) {
//       return islandId in this.islands.map;
//     },
//   },
// });
