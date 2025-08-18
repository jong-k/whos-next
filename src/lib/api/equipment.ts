import { BASE_URL } from "@/constants/app";

export const equipmentApi = {
  async getAllEquipment() {
    const response = await fetch(`${BASE_URL}/api/equipment`);
    if (!response.ok) throw new Error("failed to fetch all equipment");
    return response.json();
  },

  async getEquipment(equipmentId: number) {
    const response = await fetch(`${BASE_URL}/api/equipment/${equipmentId}`);
    if (!response.ok) throw new Error("failed to fetch equipment");
    return response.json();
  },

  async toggleEquipmentDisabled(equipmentId: number, disabled: boolean) {
    const response = await fetch(`${BASE_URL}/api/equipment/${equipmentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ disabled }),
    });

    if (!response.ok) throw new Error("failed to toggle disabled");
    return response.json();
  },
};
