import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Marquino</h3>
            <p className="text-gray-400 mb-4">
              Marquino offers premium quality furniture and home decor items that combine style, comfort, and durability.
            </p>
            <div className="flex space-x-4">
              <span className="text-gray-400 hover:text-white transition cursor-pointer">
                <i className="fa-brands fa-facebook-f"></i>
              </span>
              <span className="text-gray-400 hover:text-white transition cursor-pointer">
                <i className="fa-brands fa-instagram"></i>
              </span>
              <span className="text-gray-400 hover:text-white transition cursor-pointer">
                <i className="fa-brands fa-twitter"></i>
              </span>
              <span className="text-gray-400 hover:text-white transition cursor-pointer">
                <i className="fa-brands fa-pinterest"></i>
              </span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition cursor-pointer">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/aboutus" className="text-gray-400 hover:text-white transition cursor-pointer">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition cursor-pointer">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-gray-400 hover:text-white transition cursor-pointer">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition cursor-pointer">
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition cursor-pointer">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition cursor-pointer">
                  Lighting
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition cursor-pointer">
                  Kitchen
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition cursor-pointer">
                  Bedroom
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa-solid fa-map-marker-alt mt-1 mr-3 text-gray-400"></i>
                <span className="text-gray-400">123 Main Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-phone mr-3 text-gray-400"></i>
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-envelope mr-3 text-gray-400"></i>
                <span className="text-gray-400">info@marquino.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Marquino. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <span className="text-gray-400 hover:text-white text-sm transition cursor-pointer">
                Terms of Service
              </span>
              <span className="text-gray-400 hover:text-white text-sm transition cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-gray-400 hover:text-white text-sm transition cursor-pointer">
                Shipping Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}