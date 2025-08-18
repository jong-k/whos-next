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
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="p-4 text-left">시리얼번호</th>
          <th className="p-4 text-left">모델</th>
          <th className="p-4 text-left">상태</th>
        </tr>
      </thead>
      <tbody>
        {data!.map((equipment, index) => (
          <tr
            key={equipment.id}
            className={`hover:bg-gray-50 ${index !== data!.length - 1 ? "border-b" : ""}`}
          >
            <td className="p-4">{equipment.serial}</td>
            <td className="p-4">{equipment.model}</td>
            <td className="p-4">
              {equipment.disabled ? "비활성화" : "활성화"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
