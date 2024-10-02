"use client"
import { useUser } from "@/provider/user.provider";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const plans = [
    {
        name: "Premium Plan",
        price: "$19.99",
        features: [
            "Verified Badge",
            "Post Premium Content",
            "Access to Premium Posts",
            "Customer Support",
            "Exclusive Updates"
        ],
    },
];

export default function PricingAndPlans() {
    const { user } = useUser();
    const router = useRouter()

    const handleNavigation = () => {
        if (user?.email) {
            router.push('/payment')
        } else {
            router.push('/signin')
        }
    }

    return (
        <section className="container mx-auto py-16 px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">Pricing Plans</h2>
                <p className="text-lg text-gray-600">
                    Choose the plan that fits your needs
                </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-center gap-8">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs text-center"
                    >
                        <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                        <p className="text-4xl font-bold text-blue-600 mb-4">{plan.price}</p>
                        <ul className="mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center justify-center mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-blue-600 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m-8 0h8"
                                        />
                                    </svg>
                                    <span className="text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <motion.button
                            onClick={handleNavigation}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Subscribe Now
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
