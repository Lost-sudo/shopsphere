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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-up">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <Input
          placeholder="Search products..."
          className="pl-12 h-12 border border-white/60 bg-white/40 backdrop-blur-xl focus-visible:ring-luxury-gold focus-visible:bg-white/60 transition-all rounded-xl shadow-sm text-luxury-charcoal placeholder:text-neutral-400"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="h-12 px-6 rounded-xl text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors border border-white/60 bg-white/40 backdrop-blur-xl"
          disabled
        >
          <Filter className="w-4 h-4 mr-2 text-luxury-gold" />
          Filters
        </Button>
        <Button
          onClick={onOpenAdd}
          className="h-12 px-8 bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white rounded-xl shadow-lg shadow-black/5 uppercase tracking-widest text-[10px] font-bold transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>
    </div>
  );
}

