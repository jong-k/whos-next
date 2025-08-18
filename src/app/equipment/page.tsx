import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { equipmentApi } from "@/lib/api/equipment";
import EquipmentList from "./components/EquipmentList";
import { QUERY_KEY } from "@/constants/queryKeys";
export default async function EquipmentPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.equipmentList],
    queryFn: equipmentApi.getAllEquipment,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h2 className="mb-4 text-2xl">장비 관리 페이지</h2>
        <EquipmentList />
      </div>
    </HydrationBoundary>
  );
}
