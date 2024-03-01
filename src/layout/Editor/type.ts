export interface IDragItem {
  type: string;
  config: Record<string, unknown>;
  h: number;
  editableEl: Record<string, unknown>;
  category: string;
  x: number;
  w: number;
}
