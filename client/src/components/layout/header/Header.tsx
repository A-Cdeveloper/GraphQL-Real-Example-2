import Navigation from "../navigation/Navigation";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          <Navigation />

          {/* <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Get Started
          </Button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
