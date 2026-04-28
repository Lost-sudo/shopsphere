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
        className="w-8 h-8 rounded-xl hover:bg-white/60 transition-colors group"
        onClick={onToggleActive}
      >
        {isActive ? (
          <Eye className="w-4 h-4 text-neutral-400 group-hover:text-luxury-charcoal transition-colors" />
        ) : (
          <EyeOff className="w-4 h-4 text-neutral-300 transition-colors" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        title="Edit Product"
        className="w-8 h-8 rounded-xl hover:bg-white/60 transition-colors group"
        onClick={onEdit}
      >
        <Edit className="w-4 h-4 text-neutral-400 group-hover:text-luxury-charcoal transition-colors" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        title="Duplicate Product"
        className="w-8 h-8 rounded-xl hover:bg-white/60 transition-colors group"
        onClick={onDuplicate}
      >
        <Copy className="w-4 h-4 text-neutral-400 group-hover:text-luxury-charcoal transition-colors" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        title="Delete Product"
        className="w-8 h-8 rounded-xl hover:bg-red-50 transition-colors group"
        onClick={onDelete}
        disabled={disableDelete}
      >
        <Trash2 className="w-4 h-4 text-neutral-400 group-hover:text-red-500 transition-colors" />
      </Button>
    </div>
  );
}
