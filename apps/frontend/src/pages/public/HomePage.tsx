import FeaturedProducts from "./home/FeaturedProducts";
import HeroCarousel from "./home/HeroCarousel";

const HomePage = () => {
  return (
    <div className="space-y-8">
      <HeroCarousel />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
