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
  cardCount: number;
  cards?: IKanbanCard[];
}

export interface Kanban {
  columns: IKanbanColumn[];
}

export interface IKanbanStore {
  data: Kanban;
}
