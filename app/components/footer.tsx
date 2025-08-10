export function Footer() {
  return (
    <footer className="bg-muted/30 py-8 sm:py-12 mt-12 sm:mt-20">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  PW
                </span>
              </div>
              <span className="font-bold text-xl">Fitlex</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Transform your space into a personal gym with our premium portable
              workout equipment.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Products
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="/products"
                  className="hover:text-primary transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/bundles"
                  className="hover:text-primary transition-colors">
                  Bundle Packages
                </a>
              </li>
              <li>
                <a
                  href="/new-arrivals"
                  className="hover:text-primary transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="/featured"
                  className="hover:text-primary transition-colors">
                  Featured Products
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="/contact"
                  className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="hover:text-primary transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="hover:text-primary transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; 2025 Fitlke. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
