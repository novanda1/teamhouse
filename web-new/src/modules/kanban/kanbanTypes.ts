export interface IKanbanUtils {
  removeCard: () => void;
  dragging: () => void;
}

export interface IkanbanTag {
  id: number;
  title: string;
  color: string;
}

export interface IKanbanCard {
  id: string | number;
  title?: string;
  description?: string;
  tags: IkanbanTag[];
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
