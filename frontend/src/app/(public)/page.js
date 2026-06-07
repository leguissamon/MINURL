import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="p-10 bg-[#FFFBEA] min-h-screen">
      
 
<h1 className="text-black text-3xl font-bold mb-8 text-center">
        Avalie os Produtos Cacau Show
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}