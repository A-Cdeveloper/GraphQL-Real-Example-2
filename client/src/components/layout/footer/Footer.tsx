const Footer = () => {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container mx-auto px-4 lg:px-8 py-8 pb-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-xl">Car Shop</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner in finding quality pre-owned vehicles.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Test Drives
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Vehicle Inspection
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Warranty
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Service Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Hours</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Mon - Fri: 9am - 7pm</li>
                <li>Saturday: 9am - 6pm</li>
                <li>Sunday: 10am - 5pm</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 AutoSelect. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
