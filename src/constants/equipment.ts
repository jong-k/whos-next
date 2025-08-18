import { EquipmentItem } from "@/types/equipment";

export const DUMMY_EQUIPMENT_LIST: EquipmentItem[] = [
  { id: 1, model: "ABC-123", serial: "abc001", disabled: false },
  { id: 2, model: "XYZ-369", serial: "xyz001", disabled: true },
  { id: 3, model: "ABC-123", serial: "abc002", disabled: false },
  { id: 4, model: "BUG-010", serial: "bug001", disabled: false },
  { id: 5, model: "XYZ-369", serial: "xyz002", disabled: false },
  { id: 6, model: "ABC-123", serial: "abc003", disabled: true },
  { id: 7, model: "BUG-010", serial: "bug002", disabled: false },
  { id: 8, model: "XYZ-369", serial: "xyz003", disabled: false },
  { id: 9, model: "BUG-010", serial: "bug003", disabled: false },
  { id: 10, model: "ABC-123", serial: "abc004", disabled: false },
];

export const EQUIPMENT_MODEL_LIST = ["ABC-123", "XYZ-369", "BUG-010"] as const;
