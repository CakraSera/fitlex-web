import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Search, X } from "lucide-react";
import type { Product } from "~/lib/types";

interface MobileSearchProps {
  onSearch?: (query: string, category: string) => void;
  products: Product[];
}

export function MobileSearch({ onSearch, products }: MobileSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [...new Set(products.map((p) => p.category))];

  const handleSearch = () => {
    onSearch?.(searchQuery, selectedCategory);
    setOpen(false);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    onSearch?.("", "all");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Search Products</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium">
              Search
            </label>
            <Input
              id="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSearch} className="flex-1">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              className="flex-1 bg-transparent">
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
