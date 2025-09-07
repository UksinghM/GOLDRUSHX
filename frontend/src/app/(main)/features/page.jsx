import { Star, Search, User, Cloud, Shield } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">Why Choose ExtendEase?</h1>
          <p className="text-xl text-indigo-200 mb-6">
            Discover, review, and request the best extensions for your workflow—all in one place.
          </p>
          <Link href="/browse-extensions" className="px-8 py-3 bg-indigo-600 rounded-full font-semibold hover:bg-indigo-700 transition">
            Browse Extensions
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          <FeatureCard icon={<Search size={32} />} title="Powerful Search" desc="Find extensions fast with advanced search and filters." />
          <FeatureCard icon={<Star size={32} />} title="User Reviews" desc="Read and write reviews to help the community." />
          <FeatureCard icon={<User size={32} />} title="Admin Tools" desc="Admins can easily manage and approve extensions." />
          <FeatureCard icon={<Cloud size={32} />} title="Cloud Image Uploads" desc="Fast, reliable logo hosting with Cloudinary." />
          <FeatureCard icon={<Shield size={32} />} title="Secure & Modern" desc="Built with the latest tech for speed and safety." />
          <FeatureCard icon={<Search size={32} />} title="Request Extensions" desc="Suggest new extensions for the marketplace." />
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-200">How It Works</h2>
          <ol className="list-decimal list-inside text-lg space-y-2">
            <li>Browse or search for extensions by category or keyword.</li>
            <li>View details, ratings, and reviews for each extension.</li>
            <li>Request new extensions or submit your own (admin approval required).</li>
            <li>Admins manage, approve, and feature top extensions.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-lg p-6 flex flex-col items-center text-center shadow-lg">
      <div className="mb-4 text-indigo-300">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-200">{desc}</p>
    </div>
  );
}