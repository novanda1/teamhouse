import produce from "immer";
import create from "zustand";
import { combine } from "zustand/middleware";

/**
 * good for reference
 * but didn't used yet
 */

// export type ILandingState = {
//   section: {
//     main: {
//       active: "idle" | "team";
//       teamId: string;
//     };
//   };
// }

// const defaultState: () => ILandingState = () => {
//   return {
//     section: {
//       main: {
//         active: "idle",
//         teamId: "",
//       },
//     },
//   };
// };

// export const useLandingStore = create(
//   combine(defaultState(), (set) => ({
//     // set: (fn) => set(produce<IState>(fn)),
//     set: (fn) => set(produce(fn)),
//   }))
// );
