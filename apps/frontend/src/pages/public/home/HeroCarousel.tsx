import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Everything You Need, All in One Cart",
    description:
      "Discover quality products at great prices and enjoy a seamless shopping experience.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    button: "Shop Now",
    href: "/products",
  },
  {
    title: "Fresh Deals Every Day",
    description:
      "Find amazing deals across your favorite categories before they're gone.",
    image:
      "https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    button: "Explore Deals",
    href: "/products",
  },
  {
    title: "Shop Smarter. Live Better.",
    description:
      "Browse our collection and find products that fit your everyday lifestyle.",
    image:
      "https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    button: "Start Shopping",
    href: "/products",
  },
];

const HeroCarousel = () => {
  return (
    <section className="w-full">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.title}>
              <div className="relative min-h-125 overflow-hidden rounded-2xl">
                {/* Background image */}
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative z-10 flex min-h-125 items-center px-8 py-16 sm:px-12 lg:px-20">
                  <div className="max-w-2xl text-white">
                    <p className="mb-3 text-sm font-medium uppercase tracking-wider text-white/80">
                      Welcome to Cartzen
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                      {slide.description}
                    </p>

                    <Button className="mt-8 px-4 py-5">
                      <Link to={slide.href}>
                        <span className="text-md">{slide.button}</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
