'use client';

import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { createRating, fetchProductRatings } from '../services/feedback';
import { Rating, CreateRatingRequest } from '../types';

interface ProductRatingProps {
  productId: string;
  showForm?: boolean;
}

export default function ProductRating({ productId, showForm = true }: ProductRatingProps) {
  const { isLoggedIn } = useUser();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    fetchRatings();
  }, [productId]);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const productRatings = await fetchProductRatings(productId);
      setRatings(productRatings);
    } catch (err: any) {
      console.error('Error fetching ratings:', err);
      // Don't show error for ratings as it's not critical
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async () => {
    if (!isLoggedIn || userRating === 0) return;

    setSubmitting(true);
    setError(null);

    try {
      const ratingData: CreateRatingRequest = {
        idProduct: productId,
        rating: userRating,
      };

      await createRating(ratingData);
      setSuccess(true);
      setUserRating(0);
      
      // Refresh ratings
      fetchRatings();
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / ratings.length;
  };

  const renderStars = (rating: number, interactive: boolean = false, size: string = 'h-5 w-5') => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < Math.floor(rating);
      const halfFilled = index === Math.floor(rating) && rating % 1 >= 0.5;
      
      return (
        <button
          key={index}
          type="button"
          disabled={!interactive}
          className={`${size} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          onClick={() => interactive && setUserRating(index + 1)}
          onMouseEnter={() => interactive && setHoveredRating(index + 1)}
          onMouseLeave={() => interactive && setHoveredRating(0)}
        >
          <svg
            className={`${size} ${
              interactive
                ? (hoveredRating > index || (!hoveredRating && userRating > index))
                  ? 'text-yellow-400'
                  : 'text-gray-300'
                : filled || halfFilled
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      );
    });
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Ratings</h3>
      
      {/* Average Rating Display */}
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {renderStars(averageRating)}
        </div>
        <span className="ml-2 text-sm text-gray-600">
          {averageRating > 0 ? (
            <>
              {averageRating.toFixed(1)} out of 5 ({ratings.length} {ratings.length === 1 ? 'review' : 'reviews'})
            </>
          ) : (
            'No ratings yet'
          )}
        </span>
      </div>

      {/* Rating Form */}
      {showForm && isLoggedIn && (
        <div className="border-t pt-4">
          <h4 className="text-md font-medium text-gray-900 mb-2">Rate this product:</h4>
          
          {success && (
            <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
              Thank you for your rating!
            </div>
          )}

          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex items-center space-x-2 mb-3">
            {renderStars(userRating, true)}
            <span className="text-sm text-gray-600">
              {userRating > 0 ? `${userRating} star${userRating !== 1 ? 's' : ''}` : 'Click to rate'}
            </span>
          </div>

          <button
            onClick={handleRatingSubmit}
            disabled={userRating === 0 || submitting}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit Rating'}
          </button>
        </div>
      )}

      {/* Login Prompt */}
      {showForm && !isLoggedIn && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>{' '}
            to rate this product
          </p>
        </div>
      )}

      {/* Individual Ratings */}
      {ratings.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <h4 className="text-md font-medium text-gray-900 mb-3">Recent Reviews:</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {ratings.slice(0, 5).map((rating) => (
              <div key={rating.idRating} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {renderStars(rating.rating, false, 'h-4 w-4')}
                </div>
                <span className="text-gray-500 text-xs">
                  {new Date(rating.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}