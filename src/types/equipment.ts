import { EQUIPMENT_MODEL_LIST } from "@/constants/equipment";

export interface EquipmentItem {
  id: number;
  serial: string;
  model: string;
  disabled: boolean;
}

export type EquipmentModel = (typeof EQUIPMENT_MODEL_LIST)[number];
