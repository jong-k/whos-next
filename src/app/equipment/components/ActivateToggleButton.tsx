import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EquipmentItem } from "@/types/equipment";

export default function ActivateToggleButton({
  equipmentItem,
}: {
  equipmentItem: EquipmentItem;
}) {
  const isDisabled = equipmentItem.disabled;
  return (
    <Button
      className={cn([
        "cursor-pointer",
        "group",
        "w-[5rem]",
        "transition-colors",
        "duration-500",
        isDisabled ? "hover:bg-green-300" : "hover:bg-red-300",
      ])}
      variant="outline"
    >
      <span className="block group-hover:hidden">
        {isDisabled ? "비활성화" : "활성화"}
      </span>
      <span className="hidden group-hover:block">
        {isDisabled ? "활성화" : "비활성화"}
      </span>
    </Button>
  );
}
