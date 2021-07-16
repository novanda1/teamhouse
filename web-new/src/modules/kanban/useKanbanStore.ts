import produce from "immer";
import React from "react";
import create from "zustand";
import { combine } from "zustand/middleware";

interface useKanbanStoreProps {}

export interface IKanbanUtils {
  removeCard: () => void;
  dragging: () => void;
}

export interface IKanbanCard {
  id: string | number;
  title?: string;
  description?: string;
}

export interface IKanbanColumn {
  id: string | number;
  title: string;
  cards: IKanbanCard[];
}

export interface Kanban {
  columns: IKanbanColumn[];
}

export interface IKanbanStore {
  data: Kanban;
}

const initialBoard: IKanbanStore = {
  data: {
    columns: [
      {
        id: 1,
        title: "Next Up",
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
        cards: [
          {
            id: 2,
            title: "Drag-n-drop support",
            description: "Move a card between the columns",
          },
        ],
      },
      {
        id: 3,
        title: "Complete",
        cards: [
          {
            id: 3,
            title: "Drag-n-drop support",
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
