// In-memory cache
let cache = null;

// Closure to track fetch attempts
function createTracker() {
  let attempts = 0;

  return () => {
    attempts++;
    return {
      attempts,
      time: new Date().toLocaleTimeString(),
    };
  };
}

export const trackFetch = createTracker();

// Fetch with caching
export const fetchProducts = async () => {
  if (cache) {
    console.log("Using cached data");
    return cache;
  }

  const info = trackFetch();
  console.log("Fetch info:", info);

  const response = await fetch(
    "https://dummyjson.com/products"
  );

  const data = await response.json();

  cache = data.products;
  return cache;
};
