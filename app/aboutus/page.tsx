"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function AboutUsPage() {
  return (
    <div className="bg-white font-sans">
      <Navbar />

      {/* About Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0 w-full h-full">
          <Image 
            className="w-full h-full object-cover" 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/fc49518df7-c82630a468cfba39c502.png" 
            alt="elegant modern living room with stylish furniture, large windows, natural light, minimalist design"
            fill
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Marquino</h1>
            <p className="text-white text-lg max-w-2xl mx-auto">Crafting exceptional furniture and home decor since 2005</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-secondary text-lg leading-relaxed">
              Founded in 2005, Marquino began as a small workshop with a big dream - to create furniture that combines artisanal craftsmanship with contemporary design. What started as a passion project has grown into a beloved brand known for quality, innovation, and timeless style.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                className="absolute inset-0 w-full h-full object-cover" 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b9ae8cb4f8-26b375fab1bedeb36c17.png" 
                alt="craftsman working on wooden furniture in workshop"
                fill
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">From Humble Beginnings</h3>
              <p className="text-secondary mb-6 leading-relaxed">
                Our journey began in a small workshop in Brooklyn, where our founder Michael Marquino crafted custom pieces for local clients. His dedication to quality and attention to detail quickly earned a reputation that spread beyond the neighborhood.
              </p>
              <p className="text-secondary mb-6 leading-relaxed">
                As demand grew, so did our team of skilled artisans. Each bringing their unique expertise and passion for craftsmanship. Today, while we've expanded significantly, we maintain the same core values and hands-on approach that defined our early days.
              </p>
              <div className="flex items-center">
                <Image 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                  alt="Michael Marquino" 
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-medium text-primary">Michael Marquino</h4>
                  <p className="text-secondary text-sm">Founder & Creative Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Mission & Values</h2>
            <p className="text-secondary max-w-2xl mx-auto">We're guided by a simple philosophy: create furniture that enhances lives through beauty, functionality, and sustainability.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fa-solid fa-star text-2xl text-gray-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3 text-center">Quality Craftsmanship</h3>
              <p className="text-secondary text-center">
                We believe in creating pieces that stand the test of time, both in design and durability. Every item is crafted with meticulous attention to detail.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fa-solid fa-leaf text-2xl text-gray-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3 text-center">Sustainability</h3>
              <p className="text-secondary text-center">
                We're committed to responsible sourcing and eco-friendly practices. From sustainably harvested woods to energy-efficient production methods.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fa-solid fa-lightbulb text-2xl text-gray-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3 text-center">Innovative Design</h3>
              <p className="text-secondary text-center">
                We blend timeless aesthetics with contemporary functionality, creating pieces that are both beautiful and practical for modern living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Team</h2>
            <p className="text-secondary max-w-2xl mx-auto">The talented individuals who bring our vision to life through their expertise, creativity, and dedication.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                  alt="Michael Marquino"
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-1">Michael Marquino</h3>
              <p className="text-secondary mb-3">Founder & Creative Director</p>
              <div className="flex justify-center space-x-3">
                <span className="text-gray-400 hover:text-gray-700 transition cursor-pointer">
                  <i className="fa-brands fa-linkedin"></i>
                </span>
                <span className="text-gray-400 hover:text-gray-700 transition cursor-pointer">
                  <i className="fa-brands fa-twitter"></i>
                </span>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                  alt="Sarah Johnson"
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-1">Sarah Johnson</h3>
              <p className="text-secondary mb-3">Head of Design</p>
              <div className="flex justify-center space-x-3">
                <span className="text-gray-400 hover:text-gray-700 transition cursor-pointer">
                  <i className="fa-brands fa-linkedin"></i>
                </span>
                <span className="text-gray-400 hover:text-gray-700 transition cursor-pointer">
                  <i className="fa-brands fa-twitter"></i>
                </span>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                  alt="David Chen"
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-1">David Chen</h3>
              <p className="text-secondary mb-3">Master Craftsman</p>
              <div className="flex justify-center space-x-3">
                <span className="text-gray-400 hover:text-gray-700 transition cursor-pointer">
                  <i className="fa-brands fa-linkedin"></i>
                </span>
                <span className="text-gray-400 hover:text-gray-700 transition cursor-pointer">
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                  alt="Emily Rodriguez"
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-1">Emily Rodriguez</h3>
              <p className="text-secondary mb-3">Customer Experience</p>
              <div className="flex justify-center space-x-3">
                <span className="text-gray-400 hover:text-gray-700 transition cursor-pointer">
                  <i className="fa-brands fa-linkedin"></i>
                </span>
                <span className="text-gray-400 hover:text-gray-700 transition cursor-pointer">
                  <i className="fa-brands fa-twitter"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Design Process</h2>
            <p className="text-secondary max-w-2xl mx-auto">From concept to creation, our meticulous process ensures every piece meets our exacting standards.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Inspiration & Concept</h3>
                    <p className="text-secondary">Our designers draw inspiration from architecture, nature, and global design trends to create initial concepts.</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Sketching & Prototyping</h3>
                    <p className="text-secondary">Concepts are refined through detailed sketches and 3D models before creating physical prototypes.</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Material Selection</h3>
                    <p className="text-secondary">We carefully source sustainable, high-quality materials that meet our standards for beauty and durability.</p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Crafting & Quality Control</h3>
                    <p className="text-secondary">Our skilled artisans bring designs to life, with rigorous quality checks at every stage of production.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2">
              <Image 
                className="absolute inset-0 w-full h-full object-cover" 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/36553a24fd-f4ad08155de15aaf0ce7.png" 
                alt="designer sketching furniture concept in modern studio"
                fill
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">What Our Customers Say</h2>
            <p className="text-secondary max-w-2xl mx-auto">We're proud to have earned the trust and satisfaction of customers across the country.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="text-secondary mb-6 italic">
                The quality of Marquino's furniture is exceptional. We purchased a dining set three years ago, and it still looks as beautiful as the day it arrived. Worth every penny.
              </p>
              <div className="flex items-center">
                <Image 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" 
                  alt="Jennifer T."
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-primary">Jennifer T.</h4>
                  <p className="text-secondary text-sm">Chicago, IL</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="text-secondary mb-6 italic">
                Not only is their furniture beautiful, but their customer service is outstanding. When I had questions about care instructions, they were incredibly helpful and responsive.
              </p>
              <div className="flex items-center">
                <Image 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" 
                  alt="Robert M."
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-primary">Robert M.</h4>
                  <p className="text-secondary text-sm">Austin, TX</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-alt"></i>
              </div>
              <p className="text-secondary mb-6 italic">
                I appreciate Marquino's commitment to sustainability. It's refreshing to find a company that cares about quality and environmental responsibility. Their pieces are timeless.
              </p>
              <div className="flex items-center">
                <Image 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" 
                  alt="Samantha P."
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-primary">Samantha P.</h4>
                  <p className="text-secondary text-sm">Portland, OR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Have Questions? We're Here to Help</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you have questions about our products, custom orders, or anything else, our team is ready to assist you.
          </p>
          <Link href="/contact" className="inline-block bg-white text-gray-800 py-3 px-8 rounded-md hover:bg-gray-200 transition duration-300 font-medium cursor-pointer">Contact Us</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
