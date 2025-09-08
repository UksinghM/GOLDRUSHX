'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const CATEGORIES = ["Necklaces", "Rings", "Earrings", "Bracelets"];
const PRODUCTS_PER_LOAD = 8;

const HomePage = () => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const products = res.data.map(p => ({
          ...p,
          id: p.id || `prod-${Math.random().toString(36).substr(2, 9)}`,
          category: CATEGORIES.includes(p.type) ? p.type : 'Other',
          image: p.image || 'https://via.placeholder.com/150?text=No+Image'
        }));
        // Inject provided images into products
        products[0] = { ...products[0], image: 'https://cdn0.weddingwire.in/vendor/1675/3_2/1280/jpg/26239263-10159814299310301-3345016161906752395-n_15_11675.jpeg', category: 'Necklaces', name: 'Diamond Solitaire Necklace', price: 45000, brand: 'Luxe Jewels' };
        products[1] = { ...products[1], image: 'https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg', category: 'Rings', name: 'Gold Filigree Ring', price: 32000, brand: 'Luxe Jewels' };
        products[2] = { ...products[2], image: 'http://2.bp.blogspot.com/-qCVx05ST8xA/UKvC7J4UOaI/AAAAAAAAEkM/v-IE7iLiEXU/s1600/kada3.jpg', category: 'Bracelets', name: 'Traditional Gold Bangle', price: 58000, brand: 'Luxe Jewels' };
        products[3] = { ...products[3], image: 'https://images.indianexpress.com/2021/05/gold-jewellery_1200-Copy.jpg', category: 'Earrings', name: 'Gold Chandbali Earrings', price: 38000, brand: 'Luxe Jewels' };
        products[4] = { ...products[4], image: 'https://www.krishnajewellers.com/blog/wp-content/uploads/2021/12/Buy-Gold-Choker-Designs.jpg', category: 'Necklaces', name: 'Gold Choker Necklace', price: 52000, brand: 'Luxe Jewels' };
        products[5] = { ...products[5], image: 'https://cdn.yehaindia.com/wp-content/uploads/2020/06/Jewellery-1.jpg', category: 'Rings', name: 'Emerald Solitaire Ring', price: 42000, brand: 'Luxe Jewels' };
        products[6] = { ...products[6], image: 'https://reetifashions.com/wp-content/uploads/2019/09/RF19_TD_10.jpeg', category: 'Necklaces', name: 'Temple Gold Necklace', price: 65000, brand: 'Luxe Jewels' };
        setAllProducts(products);
        setVisibleProducts(products.slice(0, PRODUCTS_PER_LOAD));
        setHasMore(products.length > PRODUCTS_PER_LOAD);
      })
      .catch(() => {
        // Fallback with provided images
        const fallbackProducts = [
          {
            id: 'prod-1',
            image: 'https://cdn0.weddingwire.in/vendor/1675/3_2/1280/jpg/26239263-10159814299310301-3345016161906752395-n_15_11675.jpeg',
            category: 'Necklaces',
            name: 'Diamond Solitaire Necklace',
            price: 45000,
            brand: 'Luxe Jewels'
          },
          {
            id: 'prod-2',
            image: 'https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg',
            category: 'Rings',
            name: 'Gold Filigree Ring',
            price: 32000,
            brand: 'Luxe Jewels'
          },
          {
            id: 'prod-3',
            image: 'http://2.bp.blogspot.com/-qCVx05ST8xA/UKvC7J4UOaI/AAAAAAAAEkM/v-IE7iLiEXU/s1600/kada3.jpg',
            category: 'Bracelets',
            name: 'Traditional Gold Bangle',
            price: 58000,
            brand: 'Luxe Jewels'
          },
          {
            id: 'prod-4',
            image: 'https://images.indianexpress.com/2021/05/gold-jewellery_1200-Copy.jpg',
            category: 'Earrings',
            name: 'Gold Chandbali Earrings',
            price: 38000,
            brand: 'Luxe Jewels'
          },
          {
            id: 'prod-5',
            image: 'https://www.krishnajewellers.com/blog/wp-content/uploads/2021/12/Buy-Gold-Choker-Designs.jpg',
            category: 'Necklaces',
            name: 'Gold Choker Necklace',
            price: 52000,
            brand: 'Luxe Jewels'
          },
          {
            id: 'prod-6',
            image: 'https://cdn.yehaindia.com/wp-content/uploads/2020/06/Jewellery-1.jpg',
            category: 'Rings',
            name: 'Emerald Solitaire Ring',
            price: 42000,
            brand: 'Luxe Jewels'
          },
          {
            id: 'prod-7',
            image: 'https://reetifashions.com/wp-content/uploads/2019/09/RF19_TD_10.jpeg',
            category: 'Necklaces',
            name: 'Temple Gold Necklace',
            price: 65000,
            brand: 'Luxe Jewels'
          }
        ];
        setAllProducts(fallbackProducts);
        setVisibleProducts(fallbackProducts.slice(0, PRODUCTS_PER_LOAD));
        setHasMore(fallbackProducts.length > PRODUCTS_PER_LOAD);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore
      ) {
        const next = visibleProducts.length + PRODUCTS_PER_LOAD;
        setVisibleProducts(allProducts.slice(0, next));
        setHasMore(next < allProducts.length);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleProducts, hasMore, allProducts]);

  const filteredProducts = visibleProducts.filter(item =>
    search
      ? item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.brand?.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <div className="min-h-screen bg-ivory-50">
      {/* Hero Banner */}
      <section className="relative bg-cover bg-center h-[80vh] flex items-center justify-center" style={{ backgroundImage: 'url(https://images.indianexpress.com/2021/05/gold-jewellery_1200-Copy.jpg)' }}>
        <div className="text-center text-white bg-charcoal-900 bg-opacity-60 p-10 rounded-xl max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-4 tracking-tight">Radiate Timeless Beauty</h1>
          <p className="text-lg sm:text-2xl mb-6 font-serif">Explore our exquisite handcrafted jewelry</p>
          <a href="/collections" className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-serif text-lg transition duration-300">Shop Now</a>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-charcoal-900 mb-12">Our Signature Collections</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map(category => (
            <a
              key={category}
              href={`/categories/${category.toLowerCase()}`}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={
                  category === 'Necklaces'
                    ? 'https://www.krishnajewellers.com/blog/wp-content/uploads/2021/12/Buy-Gold-Choker-Designs.jpg'
                    : category === 'Rings'
                    ? 'https://cdn.yehaindia.com/wp-content/uploads/2020/06/Jewellery-1.jpg'
                    : category === 'Bracelets'
                    ? 'http://2.bp.blogspot.com/-qCVx05ST8xA/UKvC7J4UOaI/AAAAAAAAEkM/v-IE7iLiEXU/s1600/kada3.jpg'
                    : 'https://images.indianexpress.com/2021/05/gold-jewellery_1200-Copy.jpg'
                }
                alt={category}
                className="w-full h-48 sm:h-60 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-charcoal-900 bg-opacity-40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-30">
                <span className="text-white font-serif text-xl sm:text-2xl font-semibold">{category}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Product Highlights */}
      <section className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl bg-white">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-charcoal-900 mb-12">Trending Masterpieces</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map(item => (
            <div
              key={item.id}
              className="border border-ivory-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
                onError={e => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-semibold text-xl text-charcoal-900 mb-2">{item.name}</h3>
                  <p className="text-ivory-600 text-sm mb-2">{item.brand || 'Luxe Jewels'} • {item.category}</p>
                  <p className="font-bold text-gold-500 mb-3">₹{item.price}</p>
                </div>
                <div className="flex gap-3 mt-3">
                  <a href={`/products/${item.id}`} className="bg-ivory-200 text-charcoal-900 px-4 py-2 rounded-full font-serif text-sm hover:bg-ivory-300 transition duration-300">Quick View</a>
                  <button className="bg-gold-500 text-white px-4 py-2 rounded-full font-serif text-sm hover:bg-gold-600 transition duration-300">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                const next = visibleProducts.length + PRODUCTS_PER_LOAD;
                setVisibleProducts(allProducts.slice(0, next));
                setHasMore(next < allProducts.length);
              }}
              className="bg-gold-500 text-white px-8 py-3 rounded-full font-serif text-lg hover:bg-gold-600 transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* Brand Story */}
      <section className="bg-ivory-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 mb-6">Crafted for Eternity</h2>
          <p className="text-ivory-600 max-w-3xl mx-auto font-serif text-base sm:text-lg">
            Luxe Jewels blends tradition with artistry, handcrafting each piece with the finest gems and metals. 
            Our creations are more than jewelry—they’re heirlooms for generations.
          </p>
          <a href="/about" className="inline-block mt-6 text-gold-500 font-serif text-lg hover:underline">Explore Our Craft</a>
        </div>
      </section>

      {/* Customer Reviews / Trust Signals */}
      <section className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-charcoal-900 mb-12">Adored by Our Customers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-ivory-600 font-serif text-base mb-3">"The choker is stunning! A true statement piece."</p>
            <p className="text-gold-500 font-serif text-sm font-semibold">— Priya M.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-ivory-600 font-serif text-base mb-3">"The temple necklace is divine. Perfect for festivals!"</p>
            <p className="text-gold-500 font-serif text-sm font-semibold">— Anjali V.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-ivory-600 font-serif text-base mb-3">"These earrings elevate every outfit. Love them!"</p>
            <p className="text-gold-500 font-serif text-sm font-semibold">— Rhea S.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <img 
            src="https://www.gia.edu/images/gia-logo.png" 
            alt="GIA Certified" 
            className="inline-block mx-3 h-12 w-auto object-contain" 
            onError={e => { e.target.src = 'https://via.placeholder.com/150x50?text=GIA+Certified'; }}
          />
          <img 
            src="https://via.placeholder.com/150x50/333333/FFFFFF?text=Trusted+Brand" 
            alt="Trusted Brand" 
            className="inline-block mx-3 h-12 w-auto object-contain" 
          />
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-ivory-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 mb-6">Festive Elegance</h2>
          <p className="text-ivory-600 font-serif text-base sm:text-lg mb-6">Save 25% on select collections and enjoy free engraving.</p>
          <a href="/promotions" className="bg-gold-500 text-white px-8 py-3 rounded-full font-serif text-lg hover:bg-gold-600 transition duration-300">Shop Offers</a>
        </div>
      </section>

      {/* Jewelry Guides */}
      <section className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-charcoal-900 mb-12">Your Jewelry Companion</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <a href="/guides/size" className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <h3 className="font-serif font-semibold text-xl text-charcoal-900 mb-3">Perfect Fit Guide</h3>
            <p className="text-ivory-600 font-serif text-base">Find the ideal size for your jewelry with ease.</p>
          </a>
          <a href="/guides/care" className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <h3 className="font-serif font-semibold text-xl text-charcoal-900 mb-3">Care & Shine</h3>
            <p className="text-ivory-600 font-serif text-base">Keep your pieces radiant with expert care tips.</p>
          </a>
          <a href="/guides/trends" className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <h3 className="font-serif font-semibold text-xl text-charcoal-900 mb-3">Style Trends</h3>
            <p className="text-ivory-600 font-serif text-base">Stay ahead with the latest jewelry inspirations.</p>
          </a>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-ivory-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 mb-6">Join Our Exclusive Circle</h2>
          <p className="text-ivory-600 font-serif text-base sm:text-lg mb-6">Unlock special offers and style tips with our newsletter.</p>
          <div className="flex justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-l-full bg-white text-charcoal-900 font-serif focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <button className="bg-gold-500 text-white px-6 py-3 rounded-r-full font-serif hover:bg-gold-600 transition duration-300">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Contact & Social Links */}
      <section className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 mb-6">Connect With Us</h2>
        <div className="flex justify-center gap-6 mb-6">
          <a href="/contact" className="text-gold-500 font-serif text-lg hover:underline">Customer Support</a>
          <a href="/faq" className="text-gold-500 font-serif text-lg hover:underline">FAQs</a>
          <a href="/chat" className="text-gold-500 font-serif text-lg hover:underline">Live Chat</a>
        </div>
        <div className="flex justify-center gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <svg className="w-8 h-8 text-gold-500 hover:text-gold-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <svg className="w-8 h-8 text-gold-500 hover:text-gold-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54v-2.891h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <svg className="w-8 h-8 text-gold-500 hover:text-gold-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.531A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;