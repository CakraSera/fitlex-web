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
import type { Product } from "~/lib/types";

const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_API_URL,
});

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const { data } = await client.GET("/products");
  return { products: data };
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData as {
    products?: Product[];
  };

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
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden bg-transparent">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 h-5 w-5 p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              <div className="flex border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div
            className={`lg:col-span-1 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs">
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Category Filter */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={filterCategory}
                    onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue />
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

                <Separator className="mb-6" />

                {/* Price Range Filter */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="mb-6" />

                {/* Additional Filters */}
                <div className="space-y-4">
                  <label className="text-sm font-medium">
                    Additional Filters
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-stock"
                        checked={inStockOnly}
                        onCheckedChange={(checked) =>
                          setInStockOnly(checked === true)
                        }
                      />
                      <label htmlFor="in-stock" className="text-sm">
                        In Stock Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={featuredOnly}
                        onCheckedChange={(checked) =>
                          setFeaturedOnly(checked === true)
                        }
                      />
                      <label htmlFor="featured" className="text-sm">
                        Featured Products
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and View Controls */}
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MobileSearch onSearch={handleMobileSearch} products={products}/>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full xs:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                    : "space-y-4"
                }>
                {filteredProducts.map((product: Product) => {
                  const inStock: boolean = product.stockQuantity > 0;
                  return viewMode === "grid" ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <Card key={product.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex gap-4 p-4">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                            <img
                              src={
                                product.imageUrls[product.primaryIndexUrl] ||
                                "/placeholder.svg"
                              }
                              alt={product.name}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div className="flex-1">
                                <Link to={`/products/${product.slug}`}>
                                  <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                                    {product.name}
                                  </h3>
                                </Link>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {product.category}
                                  </Badge>
                                  {product.featuredProduct && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs">
                                      Featured
                                    </Badge>
                                  )}
                                  <Badge
                                    variant={
                                      inStock ? "default" : "destructive"
                                    }
                                    className="text-xs">
                                    {inStock ? "In Stock" : "Out of Stock"}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-xl">
                                  {formatCurrency(product.price)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  SKU: {product.sku}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex justify-between items-center pt-2">
                              <div className="flex flex-wrap gap-1">
                                {product.benefits
                                  .slice(0, 2)
                                  .map((benefit, index) => (
                                    <span
                                      key={index}
                                      className="text-xs bg-muted px-2 py-1 rounded">
                                      {benefit}
                                    </span>
                                  ))}
                              </div>
                              <Link to={`/products/${product.slug}`}>
                                <Button size="sm">View Details</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
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
    </div>
  );
}
