import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/products";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { ProductCard } from "~/components/product-card";
import { MobileSearch } from "~/components/mobile-search";
import { formatCurrency } from "~/lib/utils";
import {
  Filter,
  Grid3X3,
  List,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";

import createClient from "openapi-fetch";
import type { paths } from "~/generated/schema.d.ts";
import type { Product } from "~/modules/products/schema";

const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_API_URL,
});

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const { data } = await client.GET("/products");
  return { products: data };
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  if (!products) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product is empty</p>
      </div>
    );
  }
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    ...new Set((products ?? []).map((product) => product.category)),
  ];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-200000", label: "Under Rp 200,000" },
    { value: "200000-500000", label: "Rp 200,000 - Rp 500,000" },
    { value: "500000-1000000", label: "Rp 500,000 - Rp 1,000,000" },
    { value: "1000000+", label: "Over Rp 1,000,000" },
  ];

  const filteredProducts = (products ?? [])
    .filter((product: Product) => {
      const inStock = product.stockQuantity > 0;
      // Category filter
      const matchesCategory =
        filterCategory === "all" || product.category === filterCategory;

      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Price range filter
      let matchesPrice = true;
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (max) {
          matchesPrice = product.price >= min && product.price <= max;
        } else {
          matchesPrice = product.price >= min;
        }
      }

      // Stock filter
      const matchesStock = !inStockOnly || inStock;

      // Featured filter
      const matchesFeatured = !featuredOnly || product.featuredProduct;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        matchesStock &&
        matchesFeatured
      );
    })
    .sort((productA: Product, productB: Product) => {
      switch (sortBy) {
        case "price-low":
          return productA.price - productB.price;
        case "price-high":
          return productB.price - productA.price;
        case "name":
          return productA.name.localeCompare(productB.name);
        case "category":
          return productA.category.localeCompare(productB.category);
        default:
          return productB.featuredProduct ? 1 : -1;
      }
    });

  const handleMobileSearch = (query: string, category: string) => {
    setSearchQuery(query);
    setFilterCategory(category);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterCategory("all");
    setPriceRange("all");
    setInStockOnly(false);
    setFeaturedOnly(false);
    setSortBy("featured");
  };

  const activeFiltersCount = [
    filterCategory !== "all",
    priceRange !== "all",
    inStockOnly,
    featuredOnly,
    searchQuery !== "",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link
              to="/"
              className="text-muted-foreground hover:text-primary text-sm">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium text-sm">Products</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">All Products</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} of {products?.length ?? 0} products
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Sort and View Controls */}
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 mb-6">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="h-4 w-4 p-0 hover:bg-transparent">
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filterCategory !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {filterCategory}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFilterCategory("all")}
                      className="h-4 w-4 p-0 hover:bg-transparent">
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {priceRange !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {
                      priceRanges.find((price) => price.value === priceRange)
                        ?.label
                    }
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPriceRange("all")}
                      className="h-4 w-4 p-0 hover:bg-transparent">
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Products Display */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms to find what you're
                looking for.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="bg-transparent">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
