import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 pt-10 pb-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
                {/* About Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">About Us</h3>
                    <p className="text-sm">
                        Discover tips and tricks to enhance your tech skills and connect with a community of enthusiasts.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Contact Us</h3>
                    <p className="text-gray-700 cursor-pointer hover:text-gray-900 transition duration-200 transform hover:scale-105">
                        Contact Support
                    </p>
                    <p className="text-gray-700 cursor-pointer hover:text-gray-900 transition duration-200 transform hover:scale-105">
                        Privacy Policy
                    </p>
                </div>

                {/* Resources Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Resources</h3>
                    <ul className="space-y-1">
                        <li>
                            <p className="text-gray-700 cursor-pointer hover:text-gray-900 transition duration-200 transform hover:scale-105">
                                Blog
                            </p>
                        </li>
                        <li>
                            <p className="text-gray-700 cursor-pointer hover:text-gray-900 transition duration-200 transform hover:scale-105">
                                Tutorials
                            </p>
                        </li>
                        <li>
                            <p className="text-gray-700 cursor-pointer hover:text-gray-900 transition duration-200 transform hover:scale-105">
                                FAQ
                            </p>
                        </li>
                    </ul>
                </div>

                {/* Follow Us Section */}
                <div className="">
                    <h3 className="text-lg font-bold mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                        <p className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-200 transform hover:scale-105">
                            <FacebookIcon className="w-5 h-5 text-gray-700" />
                        </p>
                        <p className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-200 transform hover:scale-105">
                            <InstagramIcon className="w-5 h-5 text-gray-700" />
                        </p>
                        <p className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-200 transform hover:scale-105">
                            <TwitterIcon className="w-5 h-5 text-gray-700" />
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-6">
                <p className="text-sm">&copy; {new Date().getFullYear()} Tech Tips & Tricks Hub. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
