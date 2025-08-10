import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ProductCard } from "~/components/product-card";

import createClient from "openapi-fetch";
import type { paths } from "~/lib/api/v1";

// import { useCartStore } from "@/lib/store";
import { formatCurrency } from "~/lib/utils";
import { ShoppingCart, Heart, Play, Check, Star } from "lucide-react";
import type { Route } from "../+types/root";
import type { Product } from "~/lib/types";
// import { useToast } from "@/hooks/use-toast";

const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_API_URL,
});

interface ProductPageProps {
  params: {
    slug: string;
  };
  loaderData: {
    product: Product;
  };
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { data: product } = await client.GET("/products/{slug}", {
    params: { path: { slug: params.slug as string } },
  });
  return { product };
}

export default function ProductPage({ loaderData }: ProductPageProps) {
  const { product } = loaderData;
  const [quantity, setQuantity] = useState(product.stockQuantity);
  const inStock = product.stockQuantity > 0;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            to="/products"
            className="text-muted-foreground hover:text-primary">
            Products
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={product.imageUrls[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
              {product.imageUrls.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 aspect-square w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? "border-primary" : "border-muted"
                  }`}>
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {product.name}
                </h1>
                {product.featuredProduct && (
                  <Badge className="bg-yellow-100 text-yellow-800 w-fit">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-xs sm:text-sm text-muted-foreground ml-2">
                    (4.9/5 - 127 reviews)
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mb-4">
                {product.description}
              </p>
              <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4">
                <span className="text-2xl sm:text-3xl font-bold text-primary">
                  {formatCurrency(product.price)}
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    SKU: {product.sku}
                  </Badge>
                  <Badge
                    variant={inStock ? "default" : "destructive"}
                    className="text-xs">
                    {inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Add to Cart Form */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quantity" className="text-sm sm:text-base">
                      Quantity
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 sm:h-10 sm:w-10 bg-transparent"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}>
                        -
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(event) =>
                          setQuantity(
                            Math.max(
                              1,
                              Number.parseInt(event.target.value) || 1
                            )
                          )
                        }
                        className="w-16 sm:w-20 text-center bg-white"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 sm:h-10 sm:w-10 bg-transparent"
                        onClick={() => setQuantity(quantity + 1)}>
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      //   onClick={handleAddToCart}
                      disabled={product.stockQuantity <= 0}
                      className="flex-1"
                      size="lg">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      <span className="hidden xs:inline">Add to Cart</span>
                      <span className="xs:hidden">Add</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      //   onClick={handleWishlist}
                      className={`${isWishlisted ? "text-red-600 border-red-600" : ""} px-3 sm:px-4`}>
                      <Heart
                        className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
                      />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Key Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {product.specifications.map((spec, index) => {
                  const [label, value = ""] = spec.split(":");
                  return (
                    <li
                      key={index}
                      className="flex justify-between items-start gap-4">
                      <span className="text-muted-foreground">{label}:</span>
                      <span className="font-medium text-right">
                        {value.trim()}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        {/* {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )} */}
      </div>
    </div>
  );
}
