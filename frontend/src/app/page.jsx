'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaStar, FaDownload, FaGem, FaRing, FaPalette, FaTools } from 'react-icons/fa';

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Sample data for jewelry items
  const popularJewelry = [
    { name: "Gold Bridal Set", author: "Subham Jewels", price: "$2,500", rating: 4.9, desc: "Exquisite gold-plated bridal set" },
    { name: "Diamond Necklace", author: "Luxury Gems", price: "$3,200", rating: 4.8, desc: "Sparkling diamond pendant" },
    { name: "Emerald Earrings", author: "Royal Designs", price: "$1,800", rating: 4.7, desc: "Vibrant green emerald studs" },
    { name: "Sapphire Bracelet", author: "Elite Jewels", price: "$2,000", rating: 4.6, desc: "Elegant sapphire bangle" },
  ];

  const categories = [
    { icon: <FaGem className="text-gold text-xl" />, label: "Bridal Collections" },
    { icon: <FaRing className="text-gold text-xl" />, label: "Rings" },
    { icon: <FaPalette className="text-gold text-xl" />, label: "Necklaces" },
    { icon: <FaTools className="text-gold text-xl" />, label: "Custom Designs" },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInLetter {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          50% {
            opacity: 0.5;
            transform: translateY(10px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        body {
          background-image: url('https://i.pinimg.com/originals/e6/85/d5/e685d5100f680666552f648b16c5e5b9.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
      `}</style>

      <div className="font-serif bg-black/70 min-h-screen w-full flex flex-col items-center px-6 relative overflow-hidden">

        {/* Hero Section */}
        <div className="relative z-10 w-full max-w-5xl mt-32 sm:mt-40 flex flex-col items-center text-center text-white space-y-8 transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? 'translateY(0) scale(1)'
              : 'translateY(50px) scale(0.95)'
          }}
        >
          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-wide text-gold">
            {isVisible && (
              <>
                <div className="mb-2">
                  {'Discover,'.split('').map((letter, index) => (
                    <span
                      key={`gold-${index}`}
                      className="inline-block"
                      style={{
                        animation: `fadeInLetter 0.4s ease-out ${index * 0.06}s forwards`,
                        opacity: 0,
                        textShadow: '0 0 15px rgba(255,215,0,0.9)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                  <span>&nbsp;</span>
                  {'Craft'.split('').map((letter, index) => (
                    <span
                      key={`gold2-${index}`}
                      className="inline-block"
                      style={{
                        animation: `fadeInLetter 0.4s ease-out ${(index + 9) * 0.06}s forwards`,
                        opacity: 0,
                        textShadow: '0 0 15px rgba(255,215,0,0.9)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                  <span className="mx-1 inline-block"
                    style={{
                      animation: `fadeInLetter 0.4s ease-out 0.9s forwards`,
                      opacity: 0
                    }}
                  >
                    &
                  </span>
                  <span className="text-amber-200">
                    {'Adorn'.split('').map((letter, index) => (
                      <span
                        key={`amber-${index}`}
                        className="inline-block"
                        style={{
                          animation: `fadeInLetter 0.4s ease-out ${(index + 18) * 0.06}s forwards`,
                          opacity: 0,
                          textShadow: '0 0 15px rgba(251,191,36,0.8)',
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                </div>

                <div>
                  <span className="text-amber-200">
                    {'Luxury Jewelry'.split('').map((letter, index) => (
                      <span
                        key={`amber2-${index}`}
                        className="inline-block"
                        style={{
                          animation: `fadeInLetter 0.4s ease-out ${(index + 27) * 0.06}s forwards`,
                          opacity: 0,
                          textShadow: '0 0 15px rgba(251,191,36,0.8)',
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                </div>
              </>
            )}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-amber-100 max-w-2xl leading-relaxed px-4 sm:px-0 font-light">
            Subham Jewels is your premier destination for exquisite, handcrafted jewelry that elevates your style with timeless elegance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2">
            <Link
              href="/browse-jewelry"
              className="px-6 py-3 bg-gold hover:bg-amber-600 text-black font-semibold text-base sm:text-lg rounded-full transition-all duration-300 shadow hover:shadow-amber-400/50"
            >
              Shop Now
            </Link>
            <Link
              href="/custom-design"
              className="px-6 py-3 border border-amber-400 text-amber-200 hover:bg-amber-600 hover:text-black font-semibold text-base sm:text-lg rounded-full transition-all duration-300 shadow hover:shadow-amber-400/50"
            >
              Design Your Own
            </Link>
          </div>
        </div>

        {/* Jewelry Shop Sections */}
        <div className="w-full max-w-6xl mt-40 mb-32 px-4 space-y-20">
          {/* Categories Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-8 text-center">
              Explore Collections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className="bg-black/50 hover:bg-black/70 backdrop-blur-md border border-amber-500/30 rounded-lg p-5 flex items-center gap-3 transition-all duration-300 hover:border-amber-400/50 cursor-pointer"
                >
                  {category.icon}
                  <span className="font-medium text-amber-200">{category.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Jewelry Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-8 text-center">
              Featured Pieces
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularJewelry.map((item, index) => (
                <div 
                  key={index}
                  className="bg-black/50 backdrop-blur-md border border-amber-500/30 rounded-xl p-5 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-gold">{item.name}</h3>
                  <p className="text-sm text-amber-300 mb-3">{item.author}</p>
                  <p className="text-amber-100 text-sm mb-4">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-400">
                      <FaStar className="text-sm" />
                      <span className="ml-1 text-sm">{item.rating}</span>
                    </div>
                    <div className="text-amber-200 text-sm font-semibold">
                      {item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-4">
              Find Your Perfect Piece
            </h2>
            <p className="text-amber-100 max-w-2xl mx-auto mb-8 font-light">
              Discover the sparkle that defines you with our exclusive jewelry collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse-jewelry"
                className="px-6 py-3 bg-gold hover:bg-amber-600 text-black font-semibold rounded-full transition-all duration-300 shadow hover:shadow-amber-400/50"
              >
                Browse All Collections
              </Link>
              <Link
                href="/contact-craftsman"
                className="px-6 py-3 border border-amber-400 text-amber-200 hover:bg-amber-600 hover:text-black font-semibold rounded-full transition-all duration-300 shadow hover:shadow-amber-400/50"
              >
                Contact Our Craftsmen
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}