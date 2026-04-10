"use client";

import { cn } from "@/lib/utils";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  disableDelete?: boolean;
  className?: string;
};

export function ProductRowActions({
  onEdit,
  onDelete,
  disableDelete,
  className,
}: Props) {
  return (
    <div className={cn("flex items-center justify-end gap-2", className)}>
      <button
        type="button"
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group"
        onClick={onEdit}
      >
        <Edit className="w-4 h-4 text-slate-500 group-hover:text-amber-500" />
      </button>
      <button
        type="button"
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group disabled:opacity-50"
        onClick={onDelete}
        disabled={disableDelete}
        aria-disabled={disableDelete}
      >
        <Trash2 className="w-4 h-4 text-slate-500 group-hover:text-red-500" />
      </button>
      <button
        type="button"
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
      >
        <MoreHorizontal className="w-4 h-4 text-slate-500" />
      </button>
    </div>
  );
}

