import AnimatedContent from "@/components/AnimatedContent";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/features/products/components/ProductCard";
import { useFeaturedProducts } from "@/features/products/hooks/useFeaturedProducts";

const FeaturedProducts = () => {
  const { data: featuredProducts, isLoading } = useFeaturedProducts();

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <div className="border-b-2 border-primary w-[60%]" />
        </AnimatedContent>
      </div>

      {/* Carousel */}
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0.5}
      >
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem
                    key={`skeleton-${index}`}
                    className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 md:pl-4"
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="aspect-square animate-pulse bg-muted p-0" />
                    </Card>
                  </CarouselItem>
                ))
              : featuredProducts?.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 md:pl-4"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
          </CarouselContent>

          <CarouselPrevious className="-left-4 hidden sm:flex" />
          <CarouselNext className="-right-4 hidden sm:flex" />
        </Carousel>
      </AnimatedContent>
    </section>
  );
};

export default FeaturedProducts;
