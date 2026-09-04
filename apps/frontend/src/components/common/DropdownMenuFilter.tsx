import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { FieldLabel } from "../ui/field";

type RadioItem = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  defaultValue: string;
  defaultItemLabel: string;
  radioItems: RadioItem[];
};

const DropdownMenuFilter = ({
  label,
  value,
  onValueChange,
  defaultValue,
  defaultItemLabel,
  radioItems,
}: Props) => {
  const selectedItem = radioItems.find((item) => item.value === value);

  const selectedLabel =
    value === defaultValue
      ? defaultItemLabel
      : (selectedItem?.label ?? defaultItemLabel);

  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="min-w-32 justify-between gap-2">
            <span className="truncate">{selectedLabel}</span>
            <ChevronDown className="size-4 shrink-0" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-max">
          <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
            <DropdownMenuRadioItem value={defaultValue}>
              {defaultItemLabel}
            </DropdownMenuRadioItem>

            {radioItems.map((item) => (
              <DropdownMenuRadioItem key={item.value} value={item.value}>
                {item.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenuFilter;
