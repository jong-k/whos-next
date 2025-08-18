"use client";
import { useQuery } from "@tanstack/react-query";
import { equipmentApi } from "@/lib/api/equipment";

export default function EquipmentList() {
  const { data, isPending, error } = useQuery({
    queryKey: ["equipment-list"],
    queryFn: equipmentApi.getAllEquipment,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <ul>
      {data!.map(equipment => (
        <li key={equipment.id}>
          <div>{equipment.model}</div>
          <div>{equipment.serial}</div>
          <div>{equipment.disabled ? "true" : "false"}</div>
        </li>
      ))}
    </ul>
  );
}
