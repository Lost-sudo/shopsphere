"use client";

import { cn } from "@/lib/utils";
import { 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onToggleActive?: () => void;
  isActive?: boolean;
  disableDelete?: boolean;
  className?: string;
};

export function ProductRowActions({
  onEdit,
  onDelete,
  onDuplicate,
  onToggleActive,
  isActive = true,
  disableDelete,
  className,
}: Props) {
  return (
    <div className={cn("flex items-center justify-end gap-1.5", className)}>
      <Button
        variant="ghost"
        size="icon"
        title={isActive ? "Deactivate" : "Activate"}
        className="w-8 h-8 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 group"
        onClick={onToggleActive}
      >
        {isActive ? (
          <Eye className="w-4 h-4 text-emerald-500" />
        ) : (
          <EyeOff className="w-4 h-4 text-slate-400" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        title="Edit Product"
        className="w-8 h-8 hover:bg-amber-50 dark:hover:bg-amber-950/30 group"
        onClick={onEdit}
      >
        <Edit className="w-4 h-4 text-amber-500" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        title="Duplicate Product"
        className="w-8 h-8 hover:bg-blue-50 dark:hover:bg-blue-950/30 group"
        onClick={onDuplicate}
      >
        <Copy className="w-4 h-4 text-blue-500" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        title="Delete Product"
        className="w-8 h-8 hover:bg-red-50 dark:hover:bg-red-950/30 group"
        onClick={onDelete}
        disabled={disableDelete}
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  );
}
