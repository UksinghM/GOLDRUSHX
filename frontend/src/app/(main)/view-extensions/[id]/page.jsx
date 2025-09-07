'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Rating } from '@mui/material';
import { ArrowLeft, Download, Star, Clock, User, Package, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import toast from 'react-hot-toast';

const ViewExtension = () => {
    const { id } = useParams();
    const router = useRouter();
    const [extension, setExtension] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setUser(token);
        fetchExtensionDetails();
        fetchReviews();
    }, [id]);

    const fetchExtensionDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/extensions/${id}`);
            const contentType = response.headers.get('content-type');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log("✅ Extension fetched:", data);
                setExtension(data);
            } else {
                throw new Error('Expected JSON response');
            }
        } catch (error) {
            console.error('Error fetching extension:', error);
            setExtension(null);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:5000/rating/byextension/${id}`);
            const contentType = response.headers.get('content-type');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                setReviews(data);
            } else {
                throw new Error('Expected JSON response');
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setReviews([]);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) return alert('Please login to submit a review');

        try {
            const response = await fetch('http://localhost:5000/rating/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    extensionId: id,
                    userId: user._id,
                    rating: newReview.rating,
                    comment: newReview.comment
                }),
            });
            if (response.ok) {
                setNewReview({ rating: 0, comment: '' });
                fetchReviews();
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleInstall = () => {
        // Check if extension has required fields for VS Code installation
        if (!extension?.identifier || !extension?.publisher) {
            console.error('Missing identifier or publisher:', extension);
            alert('This extension cannot be installed directly. Please contact the developer for installation instructions.');
            return;
        }
        
        // Validate that the fields are not empty strings
        if (!extension.identifier.trim() || !extension.publisher.trim()) {
            alert('Extension installation information is incomplete. Please contact the developer.');
            return;
        }
        
        const vsCodeUrl = `vscode:extension/${extension.identifier.trim()}`;
        alert('Redirecting to VS Code', vsCodeUrl);
        console.log('Redirecting to VS Code:', vsCodeUrl);
        window.location.href = vsCodeUrl;
    };

    if (!extension) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="mx-auto max-w-6xl px-4 py-8">
                <Button variant="ghost" className="mb-6 hover:bg-gray-100" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Extensions
                </Button>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <Card className="p-6">
                            <div className="mb-6 flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{extension.name}</h1>
                                    <p className="mt-2 text-gray-600">{extension.description}</p>
                                </div>
                                {extension.identifier && extension.publisher ? (
                                    <Button
                                        type="button"
                                        onClick={handleInstall}
                                        className="bg-blue-500 hover:bg-blue-600"
                                    >
                                        <Download className="mr-2 h-4 w-4" /> Install
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        disabled
                                        className="bg-gray-400 cursor-not-allowed"
                                        title="Installation information not available"
                                    >
                                        <Download className="mr-2 h-4 w-4" /> Install Unavailable
                                    </Button>
                                )}
                            </div>

                            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="flex items-center space-x-2">
                                    <Download className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Downloads</p>
                                        <p className="font-semibold">{extension.stats?.downloads || 0}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Version</p>
                                        <p className="font-semibold">{extension.version}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <User className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Publisher</p>
                                        <p className="font-semibold">{extension.publisher}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Star className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Rating</p>
                                        <p className="font-semibold">{extension.stats?.rating?.toFixed(1) || 'No ratings'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {extension.techStack && (
                                    <Badge variant="secondary">
                                        <Package className="mr-1 h-3 w-3" />
                                        {extension.techStack}
                                    </Badge>
                                )}
                                <Badge variant="secondary">
                                    <Tag className="mr-1 h-3 w-3" />
                                    {extension.category}
                                </Badge>
                            </div>
                        </Card>

                        <Card className="mt-6 p-6">
                            <h2 className="mb-6 text-2xl font-semibold">Reviews</h2>
                            <div className="mb-8 border-b pb-8">
                                <h3 className="mb-4 text-lg font-medium">Write a Review</h3>
                                <form onSubmit={handleSubmitReview}>
                                    <div className="mb-4">
                                        <Rating value={newReview.rating} onChange={(_, value) => setNewReview(prev => ({ ...prev, rating: value }))} size="large" />
                                    </div>
                                    <textarea className="min-h-[100px] w-full rounded-lg border p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" value={newReview.comment} onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))} placeholder="Share your experience with this extension..." />
                                    <Button type="submit" className="mt-3 bg-blue-500 hover:bg-blue-600">
                                        Submit Review
                                    </Button>
                                </form>
                            </div>

                            <div className="space-y-6">
                                {reviews.length > 0 ? reviews.map((review) => (
                                    <div key={review._id} className="border-b pb-6 last:border-0">
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                                                <span className="font-medium">{review.user?.name || 'Anonymous'}</span>
                                            </div>
                                            <Rating value={review.rating} readOnly size="small" />
                                        </div>
                                        <p className="text-gray-600">{review.comment}</p>
                                    </div>
                                )) : (
                                    <p className="text-center text-gray-500">No reviews yet. Be the first to review!</p>
                                )}
                            </div>
                        </Card>
                    </div>

                    <div className="md:col-span-1">
                        <Card className="p-6">
                            <h2 className="mb-4 text-xl font-semibold">Installation</h2>
                            {extension.identifier ? (
                                <>
                                    <p className="mb-4 text-sm text-gray-600">
                                        To install this extension, click the Install button or use VS Code Quick Open (Ctrl+P) and paste:
                                    </p>
                                    <div className="bg-gray-100 p-3 rounded-md">
                                        <code>ext install {extension.identifier}</code>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="mb-4 text-sm text-gray-600">
                                        This extension doesn't have installation information available.
                                    </p>
                                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                                        <p className="text-sm text-yellow-800">
                                            Please contact the developer ({extension.developer}) for installation instructions.
                                        </p>
                                    </div>
                                </>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewExtension;


