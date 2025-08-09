import { Link } from "react-router";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Product } from "~/lib/types";
import { formatCurrency } from "~/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden h-full flex flex-col">
      <div className="aspect-square overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </Link>
      </div>
      <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link to={`/products/${product.slug}`} className="flex-1">
            <h3 className="font-semibold text-sm sm:text-base leading-tight hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          {product.isFeatured && (
            <Badge variant="secondary" className="text-xs shrink-0">
              Featured
            </Badge>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 mb-3">
          <span className="font-bold text-base sm:text-lg">
            {formatCurrency(product.price)}
          </span>
          <Badge variant="outline" className="text-xs w-fit">
            {product.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0">
        <Link to={`/products/${product.id}`} className="w-full">
          <Button className="w-full text-xs sm:text-sm" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
