import { atom } from "recoil";

export const timerStateAtoms = atom({
  key: "timerStateAtoms",
  default: {
    round: 0,
    goal: 0,
  },
});
