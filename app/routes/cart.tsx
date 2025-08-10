import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { formatCurrency } from "~/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import type { Product } from "~/lib/types";

export default function CartPage() {
  const items: Product[] = [];
  //   const totalPrice = getTotalPrice();
  //   const totalItems = getTotalItems();
  //   const shippingCost = totalPrice >= 500000 ? 0 : 25000;
  //   const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container">
          <div className="max-w-md mx-auto text-center space-y-6">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="space-y-3">
              <Link to="/products">
                <Button size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //   return (
  //     <div className="min-h-screen py-8">
  //       <div className="container">
  //         {/* Header */}
  //         <div className="flex items-center gap-4 mb-8">
  //           <Link to="/">
  //             <Button variant="ghost" size="icon">
  //               <ArrowLeft className="h-4 w-4" />
  //             </Button>
  //           </Link>
  //           <h1 className="text-3xl font-bold">Shopping Cart</h1>
  //           <span className="text-muted-foreground">({totalItems} items)</span>
  //         </div>

  //         <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
  //           {/* Cart Items */}
  //           <div className="lg:col-span-2 space-y-4">
  //             {items.map((item) => (
  //               <Card key={item.product.id}>
  //                 <CardContent className="p-4 sm:p-6">
  //                   <div className="flex gap-3 sm:gap-4">
  //                     <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
  //                       <img
  //                         src={item.product.images[0] || "/placeholder.svg"}
  //                         alt={item.product.name}
  //                         width={96}
  //                         height={96}
  //                         className="w-full h-full object-cover rounded-lg"
  //                       />
  //                     </div>

  //                     <div className="flex-1 space-y-2 min-w-0">
  //                       <div className="flex justify-between items-start gap-2">
  //                         <div className="min-w-0 flex-1">
  //                           <h3 className="font-semibold text-sm sm:text-base lg:text-lg truncate">
  //                             {item.product.name}
  //                           </h3>
  //                           <p className="text-xs sm:text-sm text-muted-foreground">
  //                             SKU: {item.product.sku}
  //                           </p>
  //                           <p className="text-xs sm:text-sm text-muted-foreground">
  //                             {item.product.category}
  //                           </p>
  //                         </div>
  //                         <Button
  //                           variant="ghost"
  //                           size="icon"
  //                           className="h-8 w-8 sm:h-10 sm:w-10 text-destructive hover:text-destructive flex-shrink-0"
  //                           onClick={() =>
  //                             handleRemoveItem(item.product.id, item.product.name)
  //                           }>
  //                           <Trash2 className="h-4 w-4" />
  //                         </Button>
  //                       </div>

  //                       <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
  //                         <div className="flex items-center gap-2">
  //                           <Button
  //                             variant="outline"
  //                             size="icon"
  //                             className="h-7 w-7 sm:h-8 sm:w-8 bg-transparent"
  //                             onClick={() =>
  //                               handleQuantityChange(
  //                                 item.product.id,
  //                                 item.quantity - 1
  //                               )
  //                             }
  //                             disabled={item.quantity <= 1}>
  //                             <Minus className="h-3 w-3" />
  //                           </Button>
  //                           <Input
  //                             type="number"
  //                             min="1"
  //                             value={item.quantity}
  //                             onChange={(e) =>
  //                               handleQuantityChange(
  //                                 item.product.id,
  //                                 Number.parseInt(e.target.value) || 1
  //                               )
  //                             }
  //                             className="w-14 sm:w-16 h-7 sm:h-8 text-center text-sm"
  //                           />
  //                           <Button
  //                             variant="outline"
  //                             size="icon"
  //                             className="h-7 w-7 sm:h-8 sm:w-8 bg-transparent"
  //                             onClick={() =>
  //                               handleQuantityChange(
  //                                 item.product.id,
  //                                 item.quantity + 1
  //                               )
  //                             }>
  //                             <Plus className="h-3 w-3" />
  //                           </Button>
  //                         </div>

  //                         <div className="text-left xs:text-right">
  //                           <p className="text-xs sm:text-sm text-muted-foreground">
  //                             {formatCurrency(item.product.price)} each
  //                           </p>
  //                           <p className="font-bold text-sm sm:text-base lg:text-lg">
  //                             {formatCurrency(item.product.price * item.quantity)}
  //                           </p>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </CardContent>
  //               </Card>
  //             ))}
  //           </div>

  //           {/* Order Summary */}
  //           <div className="space-y-6">
  //             <Card>
  //               <CardHeader>
  //                 <CardTitle>Order Summary</CardTitle>
  //               </CardHeader>
  //               <CardContent className="space-y-4">
  //                 <div className="flex justify-between">
  //                   <span>Subtotal ({totalItems} items)</span>
  //                   <span>{formatCurrency(totalPrice)}</span>
  //                 </div>

  //                 <div className="flex justify-between">
  //                   <span>Shipping</span>
  //                   <span>
  //                     {shippingCost === 0 ? (
  //                       <span className="text-green-600">Free</span>
  //                     ) : (
  //                       formatCurrency(shippingCost)
  //                     )}
  //                   </span>
  //                 </div>

  //                 {totalPrice < 500000 && (
  //                   <p className="text-sm text-muted-foreground">
  //                     Add {formatCurrency(500000 - totalPrice)} more for free
  //                     shipping
  //                   </p>
  //                 )}

  //                 <Separator />

  //                 <div className="flex justify-between text-lg font-bold">
  //                   <span>Total</span>
  //                   <span>{formatCurrency(finalTotal)}</span>
  //                 </div>

  //                 <Link to="/checkout">
  //                   <Button size="lg" className="w-full">
  //                     Proceed to Checkout
  //                   </Button>
  //                 </Link>
  //               </CardContent>
  //             </Card>

  //             {/* Navigation Links */}
  //             <div className="space-y-3">
  //               <Link to="/products">
  //                 <Button variant="outline" className="w-full bg-transparent">
  //                   Continue Shopping
  //                 </Button>
  //               </Link>
  //               <Link to="/">
  //                 <Button variant="ghost" className="w-full">
  //                   Back to Home
  //                 </Button>
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
