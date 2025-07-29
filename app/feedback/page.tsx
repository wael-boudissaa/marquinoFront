'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../contexts/UserContext';
import { createFeedback, fetchFeedback } from '../../services/feedback';
import { Feedback, CreateFeedbackRequest } from '../../types';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

function FeedbackPageContent() {
  const { user } = useUser();
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<CreateFeedbackRequest>({
    comment: '',
  });

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      const feedback = await fetchFeedback();
      setFeedbackList(feedback);
    } catch (err: any) {
      console.error('Error fetching feedback:', err);
      setError(err.message || 'Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.comment.trim()) {
      setError('Please enter your feedback');
      return;
    }

    if (formData.comment.length < 10) {
      setError('Feedback must be at least 10 characters long');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await createFeedback(formData);
      setSuccess(true);
      setFormData({ comment: '' });
      
      // Refresh feedback list to show the new feedback
      await fetchFeedbackData();
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error('Feedback submission error:', err);
      if (err.status === 401) {
        setError('Please log in to submit feedback');
      } else if (err.status === 400) {
        setError('Please check your feedback and try again');
      } else {
        setError(err.message || 'Failed to submit feedback. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ comment: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Feedback</h1>
        
        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Share Your Experience</h2>
          
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">Thank you for your feedback! It has been submitted successfully.</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={5}
                required
                maxLength={1000}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about your experience with our products and service... (minimum 10 characters)"
                value={formData.comment}
                onChange={handleChange}
              />
              <div className="flex justify-between items-center mt-1">
                <span className={`text-sm ${formData.comment.length < 10 ? 'text-red-500' : 'text-gray-500'}`}>
                  {formData.comment.length < 10 
                    ? `${10 - formData.comment.length} more characters needed` 
                    : `${formData.comment.length}/1000 characters`}
                </span>
                {formData.comment.length >= 10 && (
                  <span className="text-sm text-green-600">✓ Good length</span>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </form>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Customer Feedback</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : feedbackList.length > 0 ? (
            <div className="space-y-4">
              {feedbackList.slice(0, 10).map((feedback) => (
                <div key={feedback.idFeedback} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-800 mb-2">{feedback.comment}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>By: Customer {feedback.idCustomer}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No feedback available yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 mr-4"
          >
            ← Go Back
          </button>
          <button
            onClick={() => router.push('/shop')}
            className="text-blue-600 hover:text-blue-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <ProtectedRoute>
      <FeedbackPageContent />
    </ProtectedRoute>
  );
}