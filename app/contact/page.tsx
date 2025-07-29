"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white font-sans">
      <Navbar />

      {/* Page Title */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold text-primary">Contact Us</h1>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <Link href="/" className="cursor-pointer hover:text-accent">Home</Link>
            <i className="fa-solid fa-chevron-right mx-2 text-xs"></i>
            <span className="text-accent">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Address */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-map-marker-alt text-2xl text-gray-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Our Location</h3>
              <p className="text-gray-500">123 Main Street, New York</p>
              <p className="text-gray-500">NY 10001, United States</p>
            </div>
            
            {/* Phone */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-phone text-2xl text-gray-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Phone Number</h3>
              <p className="text-gray-500">+1 (555) 123-4567</p>
              <p className="text-gray-500">+1 (555) 987-6543</p>
            </div>
            
            {/* Email */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-envelope text-2xl text-gray-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Email Address</h3>
              <p className="text-gray-500">info@marquino.com</p>
              <p className="text-gray-500">support@marquino.com</p>
            </div>
          </div>
          
          {/* Contact Form and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-100 p-6">
                  <h2 className="text-2xl font-semibold text-primary mb-2">Send Us a Message</h2>
                  <p className="text-gray-500">We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible.</p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">First Name</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">Last Name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone (Optional)</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4} 
                        placeholder="Please provide details about your inquiry..." 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                      ></textarea>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                        <p className="text-green-800">Thank you! Your message has been sent successfully.</p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                        <p className="text-red-800">Sorry, there was an error sending your message. Please try again.</p>
                      </div>
                    )}

                    <div className="text-right">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-gray-700 text-white font-medium rounded-md hover:bg-accent transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="bg-gray-100 p-6">
                  <h2 className="text-2xl font-semibold text-primary mb-2">Our Location</h2>
                  <p className="text-gray-500">Visit our store at the address below. We're open Monday to Friday, 9am to 6pm.</p>
                </div>
                <div className="h-[400px] relative">
                  <Image 
                    className="absolute inset-0 w-full h-full object-cover" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/094113d8ba-7a7a4d7826c4df7b7ca7.png" 
                    alt="map of new york city with location pin, street view"
                    fill
                  />
                  <div className="absolute bottom-4 left-4 bg-white p-4 rounded-md shadow-md">
                    <h3 className="font-semibold text-primary mb-1">Marquino Headquarters</h3>
                    <p className="text-sm text-gray-500">123 Main Street, New York, NY 10001</p>
                    <span className="inline-block mt-2 text-sm text-accent hover:underline cursor-pointer">Get Directions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Frequently Asked Questions</h2>
            <p className="text-secondary max-w-2xl mx-auto">Find answers to the most common questions about our products and services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* FAQ Item 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-primary mb-2">What are your shipping rates?</h3>
              <p className="text-gray-500">We offer free shipping on all orders over $100. For orders under $100, shipping rates start at $9.99 depending on your location.</p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-primary mb-2">How long does shipping take?</h3>
              <p className="text-gray-500">Standard shipping takes 3-5 business days. Express shipping options are available at checkout for 1-2 business day delivery.</p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-primary mb-2">What is your return policy?</h3>
              <p className="text-gray-500">We accept returns within 30 days of delivery. Items must be in original condition with tags attached. Please contact customer service to initiate a return.</p>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-primary mb-2">Do you offer assembly services?</h3>
              <p className="text-gray-500">Yes, we offer professional assembly services for an additional fee. You can select this option during checkout or contact us for more information.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-500 mb-4">Still have questions? We're here to help!</p>
            <span className="inline-block bg-gray-700 text-white py-3 px-8 rounded-md hover:bg-accent transition duration-300 font-medium cursor-pointer">Contact Support</span>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-3">Subscribe to Our Newsletter</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Stay updated with our latest products, exclusive offers, and interior design tips.</p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <input type="email" placeholder="Your email address" className="flex-grow px-4 py-3 rounded-md focus:outline-none" />
                  <button type="submit" className="bg-white text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition duration-300">Subscribe</button>
                </form>
                <p className="text-gray-400 text-sm mt-4">By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}