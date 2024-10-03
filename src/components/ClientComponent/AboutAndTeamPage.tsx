"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import heroImg from "../../../public/assets/business_20.jpg"
import Link from "next/link"

// Sample team member data
const teamMembers = [
    { name: "John Doe", role: "CEO", image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258218/ts7iigwqslwzdlyfpjbt.avif" },
    { name: "Jane Smith", role: "CTO", image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258218/my92jirblk6nq6oasp3x.avif" },
    { name: "Robert Brown", role: "COO", image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724613714/agqmtppjhfnjahavjgjt.avif" },
]

export default function AboutAndTeamPage() {
    return (
        <div>
            {/* About Us Section */}
            <section className="container mx-auto pt-4 pb-12 px-6">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">
                            About Our Journey
                        </h2>
                        <p className="text-lg text-gray-600 mb-4">
                            We&aposve been delivering innovative solutions and services since our
                            inception. Our mission is to empower businesses by providing
                            state-of-the-art technology and solutions.
                        </p>
                        <p className="text-lg text-gray-600 mb-4">
                            With a team of experts and a dedication to excellence, we strive
                            to exceed expectations in everything we do.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-700 transition-colors"
                        >
                            Discover More
                        </motion.button>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <Image
                            src={heroImg}
                            alt="Company Journey"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="container mx-auto py-16 px-6 bg-gray-100">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">Our Expert Team</h2>
                    <p className="text-lg text-gray-600">
                        Meet the people who make everything possible
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group relative bg-white rounded-lg overflow-hidden shadow-md"
                        >
                            {/* Image */}
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={300}
                                height={300}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />

                            {/* Overlay with Team Member Info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex items-end p-4">
                                <div className="text-white">
                                    <h3 className="text-2xl font-bold">{member.name}</h3>
                                    <p className="text-lg">{member.role}</p>
                                </div>
                            </div>

                            {/* Hover Effect: Contact Icons */}
                            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                <div className="flex gap-4">
                                    <motion.p
                                        whileHover={{ scale: 1.2 }}
                                        className="text-white bg-blue-600 p-2 rounded-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 8a6 6 0 11-12 0 6 6 0 0112 0zm2 8h-4a4 4 0 00-4 4h12a4 4 0 00-4-4z"
                                            />
                                        </svg>
                                    </motion.p>
                                    <motion.p
                                        whileHover={{ scale: 1.2 }}
                                        className="text-white bg-blue-600 p-2 rounded-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 12h.01M12 12h.01M16 12h.01M9 16h6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v13a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="mt-16 text-center bg-blue-600 py-16">
                <h2 className="text-3xl font-bold text-white mb-4">Let&aposs Get in Touch</h2>
                <p className="text-white max-w-2xl mx-auto mb-6 text-lg">
                    Have any questions or want to collaborate with us? We’d love to hear from you!
                </p>
                <Link href="/contact">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-blue-600 py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
                    >
                        Contact Us Now
                    </motion.button>
                </Link>
            </section>
        </div>
    )
}
