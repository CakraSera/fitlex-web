import { Button } from "~/components/ui/button";
import { CroppedImage } from "~/components/cropped-image";
import { Link } from "react-router";
import createClient from "openapi-fetch";
import type { paths } from "~/lib/api/v1";

import { ArrowRight, Filter, Star, Users, Award, Truck } from "lucide-react";
import { ProductCard } from "~/components/product-card";
import type { Route } from "./+types/home";
import type { Product } from "~/lib/types";

export function meta() {
  return [
    {
      title: "Fitlex  - Transform Your Space Into a Personal Gym",
    },
    {
      name: "description",
      content:
        "Discover portable workout equipment designed for small spaces. Get fit anywhere, anytime with our premium collection.",
    },
  ];
}

const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_API_URL,
});

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const response = await client.GET("/products/featured");

  const { data: featuredProducts } = await client.GET("/products/featured");
  // const featuredProducts = await response.json();
  console.log("Products loaded:", featuredProducts);
  return featuredProducts;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const featuredProducts = loaderData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 sm:py-16 lg:py-20 xl:py-32">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                  Complete Workout{" "}
                  <span className="text-primary">Bundle Solutions</span> for
                  Small Spaces
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  Get everything you need with our curated workout bundles. Save
                  money and transform any space into your personal gym.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/bundles">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8">
                    Shop Bundle Deals - Save Up to 30%
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Link to="#featured">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 bg-transparent">
                    View Products
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col xs:flex-row items-center gap-4 xs:gap-8 pt-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm sm:text-base">
                    4.9/5
                  </span>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    (2,847 reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="font-semibold text-sm sm:text-base">
                    50K+
                  </span>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    Happy customers
                  </span>
                </div>
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <CroppedImage
                src="public/images/hero.jpg"
                alt="Portable workout equipment"
                width={600}
                height={600}
                cropPosition="center"
                className="w-full max-w-md mx-auto lg:max-w-none"
              />
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-3 sm:p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">
                      Premium Quality
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Certified Equipment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">
                Free Shipping
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Free delivery on orders over Rp 500,000
              </p>
            </div>
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">
                Quality Guarantee
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                30-day money-back guarantee
              </p>
            </div>
            <div className="text-center space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">
                Expert Support
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                24/7 fitness consultation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Packages Section */}
      {/* <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Solution-Based Bundles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Curated workout packages designed for specific goals and
              lifestyles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundlePackages.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Products Section */}
      <section id="featured" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our most popular portable workout equipment
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Save Big on Complete Workout Solutions?
            </h2>
            <p className="text-xl opacity-90">
              Choose from our curated bundles and save up to 30% compared to
              buying individual items
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bundles">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Shop Bundle Deals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent">
                  Browse Individual Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
