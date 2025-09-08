'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="font-serif bg-gradient-to-br from-ivory-50 to-ivory-200 min-h-screen w-full relative overflow-hidden">
        {/* ✅ Navbar removed here, keep it in layout.js */}

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section
            className="relative py-20 px-6 sm:px-8 lg:px-12 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.indianexpress.com/2021/05/gold-jewellery_1200-Copy.jpg)',
            }}
          >
            <div className="max-w-7xl mx-auto">
              <div
                className="text-center mb-16 bg-charcoal-900 bg-opacity-60 p-10 rounded-xl"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? 'translateY(0)'
                    : 'translateY(50px)',
                  transition: 'all 1s ease-out',
                }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-none drop-shadow-lg">
                  About <span className="text-gold-500">LUXE JEWELS</span>
                </h1>
                <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                  Founded in the heart of Lucknow in 2020,{' '}
                  <strong className="text-gold-500">LUXE JEWELS</strong>{' '}
                  blends timeless elegance with contemporary charm,
                  crafting jewelry that celebrates individuality and
                  sophistication.
                </p>
              </div>
            </div>
          </section>

          {/* Our Heritage Section */}
          <section className="py-16 px-6 sm:px-8 lg:px-12 bg-ivory-50">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(30px)',
                    transition: 'all 1s ease-out 0.2s',
                  }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mb-6 drop-shadow-lg">
                    Our <span className="text-gold-500">Heritage</span>
                  </h2>
                  <p className="text-lg text-ivory-600 mb-6 leading-relaxed">
                    Inspired by Lucknow’s rich cultural legacy, LUXE JEWELS
                    was born in 2020 to redefine luxury jewelry. Our designs
                    draw from the city’s artistry, blending traditional
                    craftsmanship with modern elegance.
                  </p>
                  <ul className="space-y-3 text-ivory-600">
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-3 mt-1">•</span>
                      <em>Handcrafted Excellence</em>: Each piece is
                      meticulously crafted by skilled artisans.
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-3 mt-1">•</span>
                      <em>Cultural Inspiration</em>: Designs rooted in
                      Lucknow’s heritage, with a contemporary twist.
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-3 mt-1">•</span>
                      <em>Timeless Beauty</em>: Jewelry that becomes cherished
                      heirlooms for generations.
                    </li>
                  </ul>
                </div>
                <div
                  className="bg-gradient-to-br from-gold-500/20 to-ivory-200/20 border border-gold-500/30 rounded-2xl p-8 overflow-hidden"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(30px)',
                    transition: 'all 1s ease-out 0.4s',
                  }}
                >
                  <img
                    src="https://www.krishnajewellers.com/blog/wp-content/uploads/2021/12/Buy-Gold-Choker-Designs.jpg"
                    alt="Craftsmanship"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="text-center mt-4">
                    <h3 className="text-2xl font-bold text-charcoal-900 mb-2 drop-shadow-lg">
                      Artisan Legacy
                    </h3>
                    <p className="text-ivory-600">
                      Every piece tells a story of craftsmanship and heritage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="py-16 px-6 sm:px-8 lg:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
              <div
                className="text-center mb-16"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                  transition: 'all 1s ease-out 0.6s',
                }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mb-6 drop-shadow-lg">
                  Our <span className="text-gold-500">Promise</span>
                </h2>
                <div className="relative max-w-3xl mx-auto mb-10">
                  <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-500/20 border border-gold-500/30 shadow-lg">
                      <svg
                        className="w-8 h-8 text-gold-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </div>
                  <p className="text-xl text-ivory-600 bg-ivory-100 border border-gold-500/30 rounded-2xl shadow-lg px-8 py-6 leading-relaxed font-medium">
                    <span className="text-gold-500 font-semibold">
                      LUXE JEWELS
                    </span>{' '}
                    is committed to delivering exceptional quality,
                    personalized service, and timeless designs that elevate
                    every moment.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                  className="bg-ivory-50 border border-gold-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(30px)',
                    transition: 'all 1s ease-out 0.8s',
                  }}
                >
                  <img
                    src="https://cdn0.weddingwire.in/vendor/1675/3_2/1280/jpg/26239263-10159814299310301-3345016161906752395-n_15_11675.jpeg"
                    alt="Quality"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-charcoal-900 mb-3 drop-shadow-lg">
                    Unmatched Quality
                  </h3>
                  <p className="text-ivory-600">
                    Sourcing the finest gems and metals for enduring brilliance.
                  </p>
                </div>
                <div
                  className="bg-ivory-50 border border-gold-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(30px)',
                    transition: 'all 1s ease-out 1.0s',
                  }}
                >
                  <img
                    src="https://reetifashions.com/wp-content/uploads/2019/09/RF19_TD_10.jpeg"
                    alt="Customization"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-charcoal-900 mb-3 drop-shadow-lg">
                    Personalized Designs
                  </h3>
                  <p className="text-ivory-600">
                    Custom creations tailored to your unique style and story.
                  </p>
                </div>
                <div
                  className="bg-ivory-50 border border-gold-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(30px)',
                    transition: 'all 1s ease-out 1.2s',
                  }}
                >
                  <img
                    src="https://cdn.yehaindia.com/wp-content/uploads/2020/06/Jewellery-1.jpg"
                    alt="Service"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-charcoal-900 mb-3 drop-shadow-lg">
                    Exceptional Service
                  </h3>
                  <p className="text-ivory-600">
                    Dedicated support to make your experience seamless.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Commitment Section */}
          <section className="py-16 px-6 sm:px-8 lg:px-12 bg-ivory-100">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div
                  className="bg-gradient-to-br from-gold-500/20 to-ivory-200/20 border border-gold-500/30 rounded-2xl p-8 overflow-hidden"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(30px)',
                    transition: 'all 1s ease-out 1.4s',
                  }}
                >
                  <img
                    src="http://2.bp.blogspot.com/-qCVx05ST8xA/UKvC7J4UOaI/AAAAAAAAEkM/v-IE7iLiEXU/s1600/kada3.jpg"
                    alt="Customer Commitment"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="text-center mt-4">
                    <h3 className="text-2xl font-bold text-charcoal-900 mb-2 drop-shadow-lg">
                      Your Trust, Our Promise
                    </h3>
                    <p className="text-ivory-600">
                      We cherish our customers, delivering honesty and care in
                      every interaction.
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(30px)',
                    transition: 'all 1s ease-out 1.6s',
                  }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mb-6 drop-shadow-lg">
                    Our <span className="text-gold-500">Commitment</span>
                  </h2>
                  <p className="text-lg text-ivory-600 mb-6 leading-relaxed">
                    At LUXE JEWELS, jewelry is more than an accessory—it’s a
                    reflection of personality, memories, and milestones. We are
                    dedicated to exceeding expectations with unparalleled
                    quality and personalized service.
                  </p>
                  <p className="text-lg text-ivory-600 mb-6 leading-relaxed">
                    Driven by <em>honesty</em> and <em>trust</em>, we create
                    pieces that inspire confidence, elegance, and joy for every
                    occasion.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 px-6 sm:px-8 lg:px-12 bg-ivory-50">
            <div
              className="max-w-4xl mx-auto text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s ease-out 1.8s',
              }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mb-6 drop-shadow-lg">
                Get in Touch
              </h2>
              <p className="text-xl text-ivory-600 mb-8">
                Have questions or need assistance? Our team is here to make
                your jewelry journey exceptional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-600 transition-colors shadow-lg"
                >
                  Contact Us
                </Link>
                <a
                  href="mailto:support@luxejewels.in"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-gold-500 text-gold-500 font-semibold rounded-full hover:bg-gold-500 hover:text-white transition-colors"
                >
                  Email Support
                </a>
              </div>
              <p className="text-ivory-600 mt-6">
                Visit our{' '}
                <Link
                  href="/contact"
                  className="text-gold-500 hover:underline"
                >
                  Contact page
                </Link>{' '}
                or email us at{' '}
                <a
                  href="mailto:support@luxejewels.in"
                  className="text-gold-500 hover:underline font-semibold"
                >
                  support@luxejewels.in
                </a>
              </p>
            </div>
          </section>

          {/* Trust Signals */}
          <section className="py-16 px-6 sm:px-8 lg:px-12 bg-white">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mb-12 drop-shadow-lg">
                Trusted by Thousands
              </h2>
              <div className="flex justify-center gap-6">
                <img
                  src="https://www.gia.edu/images/gia-logo.png"
                  alt="GIA Certified"
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/150x50?text=GIA+Certified';
                  }}
                />
                <img
                  src="https://via.placeholder.com/150x50/333333/FFFFFF?text=Trusted+Brand"
                  alt="Trusted Brand"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
