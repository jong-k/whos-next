"use client";

import { useRef } from "react";
import { QUERY_KEY } from "@/constants/queryKeys";
import { equipmentApi } from "@/lib/api/equipment";
import { EquipmentItem } from "@/types/equipment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import ToggleDisabledButton from "./ToggleDisabledButton";

export default function EquipmentList() {
  const queryClient = useQueryClient();
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    data: equipmentListData,
    isPending,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.equipmentList],
    queryFn: equipmentApi.getAllEquipment,
  });

  const { mutate: toggleDisabled } = useMutation({
    mutationFn: (equipment: EquipmentItem) => equipmentApi.toggleEquipmentDisabled(equipment.id, !equipment.disabled),
    onSuccess: newEquipmentItem => {
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEY.equipmentList] });
      queryClient.setQueryData([QUERY_KEY.equipmentList], (oldEquipmentList: EquipmentItem[]) => {
        return oldEquipmentList.map(equipmentItem => {
          return equipmentItem.id === newEquipmentItem.id ? newEquipmentItem : equipmentItem;
        });
      });
    },
  });

  const rowVirtualizer = useVirtualizer({
    count: equipmentListData?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 69,
    overscan: 5,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <div className="h-[402px] w-full overflow-auto" ref={parentRef}>
      <table className="w-full">
        <thead className="sticky top-0 left-0 w-full bg-gray-200">
          <tr className="border-b">
            <th className="p-4 text-left">번호</th>
            <th className="p-4 text-left">모델</th>
            <th className="p-4 text-left">시리얼번호</th>
            <th className="p-4 text-left">상태</th>
          </tr>
        </thead>
        <tbody className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map(virtualItem => {
            const equipmentItem = equipmentListData[virtualItem.index];
            return (
              <tr
                key={equipmentItem.id}
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                className="absolute top-0 right-0 left-0 table w-full table-fixed border-b last:border-none hover:bg-gray-50"
              >
                <td className="p-4">{equipmentItem.id}</td>
                <td className="p-4">{equipmentItem.model}</td>
                <td className="p-4">{equipmentItem.serial}</td>
                <td className="p-4">
                  <ToggleDisabledButton
                    equipmentItem={equipmentItem}
                    handleClick={() => toggleDisabled(equipmentItem)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
