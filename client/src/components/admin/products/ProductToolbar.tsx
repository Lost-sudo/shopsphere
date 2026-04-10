"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";

type Props = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onOpenAdd: () => void;
};

export function ProductToolbar({ searchTerm, onSearchTermChange, onOpenAdd }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search products..."
          className="pl-10 h-10 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="h-10 border-slate-200 dark:border-slate-800 flex items-center gap-2 font-semibold"
          disabled
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button
          onClick={onOpenAdd}
          className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 dark:shadow-none flex items-center gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>
    </div>
  );
}

