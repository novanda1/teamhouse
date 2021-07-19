import produce from "immer";
import create from "zustand";
import { combine } from "zustand/middleware";
import { IKanbanStore } from "./kanbanTypes";

const initialBoard: IKanbanStore = {
  data: {
    columns: [
      {
        id: 1,
        title: "Next Up",
        cardCount: 1,
        cards: [
          {
            id: 1,
            title:
              "[Sejalur Studio] - Create Prototype Mobile for Get Notification in Principle",
            description: "",
            tags: [{ id: 1, title: "Code", color: "green.500" }],
          },
        ],
      },
      {
        id: 2,
        title: "In Progress",
        cardCount: 1,
        cards: [
          {
            id: 2,
            title:
              "[Lux] - Design Lux Pet Shop Product Page Responsive Website",
            description: "",
            tags: [{ id: 3, title: "Design", color: "red.500" }],
          },
        ],
      },
      {
        id: 3,
        title: "Complete",
        cardCount: 1,
        cards: [
          {
            id: 3,
            title:
              "[Metaco] - Create draft design for User Journey earning coins on app",
            description: "",
            tags: [{ id: 3, title: "Illustration", color: "blue.500" }],
          },
        ],
      },
    ],
  },
};

export const useKanbanStore = create(
  combine(initialBoard, (set) => ({
    set: (fn: any) => set(produce<IKanbanStore>(fn)),
  }))
);
