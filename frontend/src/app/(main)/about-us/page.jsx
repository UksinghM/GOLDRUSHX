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
      `}</style>
      <div className="font-sans bg-gradient-to-br from-black via-indigo-900 to-blue-900 min-h-screen w-full relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative py-20 px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16" style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 1s ease-out'
              }}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 flex items-center justify-center gap-3 leading-none drop-shadow-lg">
                  <img
                    src="/sq.ico"
                    alt="Logo"
                    className="inline-block h-[1.0em] w-[1.0em] align-middle"
                  />
                  <span className="-ml-0.1">
                    About <span className="text-indigo-200">ExtendEase</span>
                  </span>
                </h1>
                <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                  Welcome to <strong className="text-indigo-200">ExtendEase</strong> – The VS Code Extensions Marketplace built 
                  <strong className="text-indigo-200">by developers, for developers</strong>. Discover, share, and manage 
                  Visual Studio Code extensions with ease.
                </p>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="py-16 px-6 sm:px-8 lg:px-12 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 0.2s'
                }}>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                    <span className="text-indigo-200">Our</span> Vision
                  </h2>
                  <p className="text-lg text-white mb-6 leading-relaxed">
                    We envision effortless extension discovery for every developer. 
                    <strong className="text-indigo-200">ExtendEase</strong> is building the future by creating:
                  </p>
                  <ul className="space-y-3 text-white">
                    <li className="flex items-start">
                      <span className="text-indigo-200 mr-3 mt-1">•</span>
                      A <em>curated ecosystem</em> where quality extensions rise to the top through community-driven ratings and reviews
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-200 mr-3 mt-1">•</span>
                      An <em>intelligent discovery platform</em> that learns from your coding patterns and suggests the perfect extensions
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-200 mr-3 mt-1">•</span>
                      A <em>collaborative space</em> where developers share insights, feedback, and build better tools together
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-200 mr-3 mt-1">•</span>
                      A <em>seamless experience</em> from discovery to installation, making your development workflow faster and more efficient
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-8" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 0.4s'
                }}>
                  <div className="text-center">
                    <div className="text-6xl mb-4">💻</div>
                    <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Built for Developers</h3>
                    <p className="text-white">
                      A platform that understands the needs of modern developers and provides the tools they need to succeed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="py-16 px-6 sm:px-8 lg:px-12 bg-black/10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16" style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s ease-out 0.6s'
              }}>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                  🔧 What We Offer
                </h2>
                <div className="relative max-w-3xl mx-auto mb-10">
                  <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 shadow-lg">
                      <svg className="w-8 h-8 text-indigo-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-xl text-white bg-black/40 backdrop-blur-sm border border-indigo-500/30 rounded-2xl shadow-lg px-8 py-6 leading-relaxed font-medium">
                    <span className="text-indigo-200 font-semibold">ExtendEase</span> helps you discover and manage VS Code extensions with smart filters and clear organization. Spend less time searching, more time building.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature Cards */}
                <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-black/30" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 0.8s'
                }}>
                  <div className="text-3xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">Advanced Search & Filtering</h3>
                  <p className="text-white">
                    Quickly locate extensions by category, technology, rating, or keyword with our powerful search engine.
                  </p>
                </div>

                <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-black/30" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 1.0s'
                }}>
                  <div className="text-3xl mb-4">👤</div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">Personalized Dashboards</h3>
                  <p className="text-white">
                    Tailored spaces for developers, publishers, and admins to manage their activities efficiently.
                  </p>
                </div>

                <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-black/30" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 1.2s'
                }}>
                  <div className="text-3xl mb-4">⭐</div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">Ratings & Reviews</h3>
                  <p className="text-white">
                    Community-driven feedback to highlight the best tools and help you make informed decisions.
                  </p>
                </div>

                <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-black/30" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 1.4s'
                }}>
                  <div className="text-3xl mb-4">📦</div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">One-Click VS Code Integration</h3>
                  <p className="text-white">
                    Use our vscode: URI scheme to install extensions directly into your editor with a single click.
                  </p>
                </div>

                <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-black/30" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 1.6s'
                }}>
                  <div className="text-3xl mb-4">🔐</div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">Secure Authentication</h3>
                  <p className="text-white">
                    JWT-based login and role-based access keep your data safe and your experience smooth.
                  </p>
                </div>

                <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-black/30" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 1.8s'
                }}>
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">High Performance</h3>
                  <p className="text-white">
                    Built with modern technologies for fast, responsive, and reliable performance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Community Section */}
          <section className="py-16 px-6 sm:px-8 lg:px-12 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 2.0s'
                }}>
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤝</div>
                    <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Join Our Community</h3>
                    <p className="text-white">
                      Connect with fellow developers, share your extensions, and discover amazing tools.
                    </p>
                  </div>
                </div>
                <div style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 2.2s'
                }}>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                    🧑‍🤝‍🧑 Our Community
                  </h2>
                  <p className="text-lg text-white mb-6 leading-relaxed">
                    ExtendEase is more than just a marketplace—it's a hub for collaboration, feedback, and discovery. 
                    Whether you're a seasoned developer looking for niche tools, or an indie creator seeking visibility 
                    for your first extension, you'll find your place here.
                  </p>
                  <p className="text-lg text-white mb-6 leading-relaxed">
                    We believe in the <em>open-source spirit</em>, the power of <strong>developer feedback</strong>, 
                    and the value of <strong>accessible innovation</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Roadmap Section */}
          <section className="py-16 px-6 sm:px-8 lg:px-12 bg-black/10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16" style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s ease-out 2.4s'
              }}>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                  🌱 Looking Ahead
                </h2>
                <p className="text-xl text-white max-w-3xl mx-auto">
                  Our roadmap includes exciting features that will make ExtendEase even more powerful and user-friendly.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 2.6s'
                }}>
                  <div className="bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-lg">Personalized Recommendations</h3>
                  <p className="text-white">AI-powered extension suggestions based on your coding patterns</p>
                </div>

                <div className="text-center" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 2.8s'
                }}>
                  <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-lg">Real-time Analytics</h3>
                  <p className="text-white">In-depth analytics dashboards for publishers and developers</p>
                </div>

                <div className="text-center" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 3.0s'
                }}>
                  <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔌</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-lg">API Integration</h3>
                  <p className="text-white">Real-time data integration via powerful APIs</p>
                </div>

                <div className="text-center" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease-out 3.2s'
                }}>
                  <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-lg">And Much More</h3>
                  <p className="text-white">Continuous improvements and new features based on community feedback</p>
                </div>
              </div>

              <div className="text-center mt-12" style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s ease-out 3.4s'
              }}>
                <p className="text-lg text-white">
                  We're just getting started—and we're excited to build the future of extension sharing with <strong className="text-indigo-200">you</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 px-6 sm:px-8 lg:px-12 bg-black/20 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center" style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s ease-out 3.6s'
            }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                📬 Get in Touch
              </h2>
              <p className="text-xl text-white mb-8">
                Have questions, feedback, or suggestions? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  Contact Us
                </Link>
                <a 
                  href="mailto:support@extendease.dev" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-indigo-400 text-indigo-200 font-semibold rounded-full hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  Email Support
                </a>
              </div>
              <p className="text-white mt-6">
                Reach out via our <Link href="/contact" className="text-indigo-200 hover:underline">Contact page</Link> or email us at{' '}
                <a href="mailto:support@extendease.dev" className="text-indigo-200 hover:underline font-semibold">
                  support@extendease.dev
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;