'use client';

import React from 'react';
import Link from 'next/link';

const HelpPage = () => {
  return (
    <div className="min-h-screen w-full bg-white font-sans relative overflow-hidden">
      {/* Content Wrapper for z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 flex items-center justify-center gap-3 leading-none drop-shadow-lg">
                <img
                  src="/sq.ico"
                  alt="Logo"
                  className="inline-block h-[1.0em] w-[1.0em] align-middle"
                />
                <span className="-ml-0.1">Help & <span className="text-indigo-200">Support</span></span>
              </h1>
              <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                Welcome to the <strong className="text-indigo-200">ExtendEase Help Center</strong>! Here you'll find everything you need to get started, troubleshoot issues, and make the most of our VS Code Extensions Marketplace.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm border-t border-indigo-500/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">🚦 Quick Start Guide</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-3">Browse & Search Extensions</h3>
                <p className="text-indigo-100">
                  Use the <b>All Extensions</b> page to explore available extensions. Filter by category, search by name, developer, or description, and sort results to find what you need quickly.
                </p>
                <Link href="/browse-extensions" className="text-indigo-200 underline text-sm">Go to All Extensions</Link>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">➕</div>
                <h3 className="text-xl font-bold text-white mb-3">Add Your Extension</h3>
                <p className="text-indigo-100">
                  Want to share your own VS Code extension? Use the <b>Add Extension</b> page to submit details, upload a logo, and describe features. Your extension will be visible to the community after admin approval.
                </p>
                <Link href="/add-extension" className="text-indigo-200 underline text-sm">Add an Extension</Link>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">🛠️</div>
                <h3 className="text-xl font-bold text-white mb-3">Manage Extensions (Admin)</h3>
                <p className="text-indigo-100">
                  Admins can edit, publish/unpublish, or delete extensions from the <b>Manage Extensions</b> dashboard. Use the search and filter tools to quickly find and update listings.
                </p>
                <Link href="/admin/manage-extensions" className="text-indigo-200 underline text-sm">Admin Manage Extensions</Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/10 backdrop-blur-sm border-t border-indigo-500/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">❓ Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-indigo-200">How do I install an extension?</h3>
                <p className="text-indigo-100 mb-4">Click the <b>Download Extension</b> button on an extension's details page. You can also use the <code>vscode:extension/</code> link for one-click install in VS Code.</p>
                <h3 className="font-semibold text-lg mb-2 text-indigo-200">How do I update or remove my extension?</h3>
                <p className="text-indigo-100 mb-4">If you are the publisher, contact the admin or use the dashboard to request changes. Admins can edit or delete extensions directly.</p>
                <h3 className="font-semibold text-lg mb-2 text-indigo-200">Who can rate or review extensions?</h3>
                <p className="text-indigo-100 mb-4">All registered users can rate and review extensions to help others make informed choices.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-indigo-200">I forgot my admin password. What do I do?</h3>
                <p className="text-indigo-100 mb-4">Contact the platform owner or use the password reset feature (if enabled). For security, only authorized users can reset admin credentials.</p>
                <h3 className="font-semibold text-lg mb-2 text-indigo-200">How do I report a problem or bug?</h3>
                <p className="text-indigo-100 mb-4">Use the contact form or email support@extendease.com. Include as much detail as possible for a quick resolution.</p>
                <h3 className="font-semibold text-lg mb-2 text-indigo-200">Where can I find more documentation?</h3>
                <p className="text-indigo-100 mb-4">Check the <Link href="/about-us" className="text-indigo-200 underline">About Us</Link> page for more info, or reach out to our team for help.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm border-t border-indigo-500/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">💡 Tips for Best Experience</h2>
            <ul className="space-y-4 text-lg text-indigo-100 max-w-3xl mx-auto">
              <li>• Use the search and filter tools to quickly find relevant extensions.</li>
              <li>• Check ratings and reviews before installing new tools.</li>
              <li>• Keep your extensions up to date for the latest features and security fixes.</li>
              <li>• If you're an admin, regularly review new submissions for quality and compliance.</li>
              <li>• Join the community to share feedback and suggest new features!</li>
            </ul>
          </div>
        </section>

        {/* More Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/10 backdrop-blur-sm border-t border-indigo-500/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">🌟 More Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-3">Advanced Search & Filtering</h3>
                <p className="text-indigo-100">Quickly locate extensions by category, technology, rating, or keyword with our powerful search engine.</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">👤</div>
                <h3 className="text-xl font-bold text-white mb-3">Personalized Dashboards</h3>
                <p className="text-indigo-100">Tailored spaces for developers, publishers, and admins to manage their activities efficiently.</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">⭐</div>
                <h3 className="text-xl font-bold text-white mb-3">Ratings & Reviews</h3>
                <p className="text-indigo-100">Community-driven feedback to highlight the best tools and help you make informed decisions.</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">📦</div>
                <h3 className="text-xl font-bold text-white mb-3">One-Click VS Code Integration</h3>
                <p className="text-indigo-100">Use our vscode: URI scheme to install extensions directly into your editor with a single click.</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-white mb-3">Secure Authentication</h3>
                <p className="text-indigo-100">JWT-based login and role-based access keep your data safe and your experience smooth.</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-white mb-3">High Performance</h3>
                <p className="text-indigo-100">Built with modern technologies for fast, responsive, and reliable performance.</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-white mb-3">Community Features</h3>
                <p className="text-indigo-100">Connect with fellow developers, share your extensions, and discover amazing tools in a collaborative environment.</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-white mb-3">Admin Tools</h3>
                <p className="text-indigo-100">Admins can manage, review, publish/unpublish, and delete extensions to ensure quality and compliance.</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-3">Analytics & Insights</h3>
                <p className="text-indigo-100">Track downloads, ratings, and user engagement with real-time analytics dashboards (coming soon).</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-black/30">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Personalized Recommendations</h3>
                <p className="text-indigo-100">AI-powered extension suggestions based on your coding patterns (future roadmap).</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage; 