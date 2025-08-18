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
        <h2>Equipment Page</h2>
        <EquipmentList />
      </div>
    </HydrationBoundary>
  );
}
