import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { fetchProducts } from "./productService";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Request ID to prevent race conditions
  const requestIdRef = useRef(0);

  useEffect(() => {
    const loadProducts = async () => {
      const requestId = ++requestIdRef.current;

      try {
        const data = await fetchProducts();

        // Prevent stale updates
        if (requestId === requestIdRef.current) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="grid">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        : products.map((p) => (
            <ProductCard
              key={p.id}
              title={p.title}
              price={p.price}
              thumbnail={p.thumbnail}
            />
          ))}
    </div>
  );
};

export default ProductContainer;
