"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { equipmentApi } from "@/lib/api/equipment";
import ToggleDisabledButton from "./ToggleDisabledButton";
import { QUERY_KEY } from "@/constants/queryKeys";
import { EquipmentItem } from "@/types/equipment";

export default function EquipmentList() {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEY.equipmentList],
    queryFn: equipmentApi.getAllEquipment,
  });

  const { mutate: toggleDisabled } = useMutation({
    mutationFn: (equipment: EquipmentItem) =>
      equipmentApi.toggleEquipmentDisabled(equipment.id, !equipment.disabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
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
        {data!.map(equipment => (
          <tr
            key={equipment.id}
            className="border-b last:border-none hover:bg-gray-50"
          >
            <td className="p-4">{equipment.serial}</td>
            <td className="p-4">{equipment.model}</td>
            <td className="p-4">
              <ToggleDisabledButton
                equipmentItem={equipment}
                handleClick={() => toggleDisabled(equipment)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
