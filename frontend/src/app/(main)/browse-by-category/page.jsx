"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const BrowseByCategory = () => {
  const [extensions, setExtensions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        const response = await fetch("http://localhost:5000/extensions");
        const data = await response.json();
        setExtensions(data);
      } catch (error) {
        console.error("Error fetching extensions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExtensions();
  }, []);

  // Group extensions by category
  const grouped = extensions.reduce((acc, ext) => {
    const category = ext.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(ext);
    return acc;
  }, {});

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-white leading-tight tracking-tight">
            Browse by <span className="text-indigo-200 drop-shadow-lg">Category</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Discover extensions grouped by their category
          </p>
        </div>
        {Object.entries(grouped).map(([category, extList]) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-200">{category}</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {extList.map((ext) => (
                <Card key={ext._id} className="group transition-all duration-200 overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/15 hover:border-indigo-400/50 h-[400px] flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 rounded-lg">
                        <AvatarImage src={ext.logo || "/placeholder.svg"} />
                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {ext.name?.charAt(0).toUpperCase() || "E"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg leading-tight text-white group-hover:text-indigo-300 transition-colors font-semibold">
                            {ext.name}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm mb-4 line-clamp-2 text-gray-200">{ext.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block text-xs bg-gray-700 text-white border border-gray-600 rounded px-2 py-0.5">v{ext.version}</span>
                      <span className={`inline-block text-xs rounded px-2 py-0.5 ${ext.published ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                        {ext.published ? "Published" : "Unpublished"}
                      </span>
                    </div>
                    {ext.features && ext.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2 text-white">Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {ext.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="inline-block text-xs bg-indigo-600/20 text-indigo-200 border border-indigo-400/30 rounded px-2 py-0.5">
                              {feature}
                            </span>
                          ))}
                          {ext.features.length > 3 && (
                            <span className="inline-block text-xs bg-indigo-600/20 text-indigo-200 border border-indigo-400/30 rounded px-2 py-0.5">
                              +{ext.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    <Link href={`/view-extensions/${ext._id}`} className="text-indigo-400 hover:underline">
                      View Details
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;