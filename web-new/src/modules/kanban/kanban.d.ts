declare module "@asseinfo/react-kanban" {
  const Board: import("react").FC<{
    renderCard?: (
      kanban: import("./kanbanTypes").IKanbanCard,
      utils: import("./kanbanTypes").IKanbanUtils
    ) => JSX.Element;
    renderColumnHeader?: (
      kanban: import("./kanbanTypes").IKanbanColumn,
      utils: import("./kanbanTypes").IKanbanUtils
    ) => JSX.Element;
    onCardDragEnd?: (
      _board: import("./kanbanTypes").Kanban,
      card: import("./kanbanTypes").IKanbanCard,
      source: { fromPosition: number; fromColumnId: number },
      destination: { toPosition: number; toColumnId: number }
    ) => void;
    initialBoard?: Kanban;
    disableColumnDrag?: boolean;
  }> = () => {};

  export = Board;
}
