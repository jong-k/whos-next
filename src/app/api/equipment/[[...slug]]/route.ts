import { DUMMY_EQUIPMENT_LIST } from "@/constants/equipment";

const equipmentList = [...DUMMY_EQUIPMENT_LIST];

export async function GET(request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  // /api/equipment - 모든 equipment list 반환
  if (!slug || slug.length === 0) return Response.json(equipmentList);

  // /api/equipment/{id} - 특정 equipment item 반환
  if (slug.length === 1) {
    const id = parseInt(slug[0]);

    if (isNaN(id)) return Response.json({ error: "Invalid Equipment ID format" }, { status: 400 });

    const equipmentItem = equipmentList.find(item => item.id === id);

    if (!equipmentItem) return Response.json({ error: "Equipment not found" }, { status: 404 });

    return Response.json(equipmentItem);
  }
  return Response.json({ error: "Not found" }, { status: 404 });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  if (slug.length === 1) {
    const id = parseInt(slug[0]);

    if (isNaN(id)) return Response.json({ error: "Invalid Equipment Id format" }, { status: 400 });

    const equipmentItem = equipmentList.find(item => item.id === id);

    if (!equipmentItem)
      return Response.json(
        { error: "Equipment not found" },
        {
          status: 404,
        }
      );

    const body = await request.json();
    const isDisabled = body.disabled;

    if (isDisabled !== equipmentItem.disabled) {
      equipmentItem.disabled = isDisabled;
    }

    return Response.json(equipmentItem);
  }
  // 그 외 경로는 404
  return Response.json({ error: "Not found" }, { status: 404 });
}
