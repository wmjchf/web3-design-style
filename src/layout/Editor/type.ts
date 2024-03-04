export interface IDragItem {
  type: string;
  config: Record<string, unknown>;
  h: number;
  hAuto: boolean;
  editableEl: Record<string, unknown>;
  category: string;
  x: number;
  w: number;
}
