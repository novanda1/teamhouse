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
            description: "Add capability to add a card in a column",
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
            description: "Move a card between the columns",
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
            description: "Move a card between the columns",
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
