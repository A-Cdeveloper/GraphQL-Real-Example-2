export function Hero() {
  return (
    <section className="relative py-2 overflow-hidden">
      <div className="container mx-auto px-0">
        <div className="grid lg:grid-cols-2 gap-5 items-center">
          <div className="space-y-6 lg:space-y-10">
            <div className="inline-block">
              <span className="text-xs lg:text-sm font-mono uppercase tracking-wider text-accent">
                Premium Selection
              </span>
            </div>

            <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-7xl  tracking-tight text-balance">
              FIND YOUR PERFECT RIDE.
            </h1>

            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
              Discover our curated collection of quality vehicles. From sleek
              sedans to powerful SUVs, we have the perfect car waiting for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Browse Inventory
              </Button>
              <Button size="lg" variant="outline">
                Schedule Test Drive
              </Button> */}
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl lg:text-3xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Vehicles</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-2xl lg:text-3xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">Inspected</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-2xl lg:text-3xl font-bold">5★</div>
                <div className="text-sm text-muted-foreground">Rated</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted">
              <img
                src="/images/bmw-8series-coupe-modellfinder.png"
                alt="Featured vehicle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-lg blur-3xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-lg blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
