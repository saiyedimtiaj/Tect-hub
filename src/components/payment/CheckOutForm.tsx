import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateNewOrder } from "@/hooks/payment.hook";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isPaymentElementComplete, setIsPaymentElementComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { mutate: createOrder } = useCreateNewOrder()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message || "An unexpected error occurred.");
            toast.error(error.message || "Payment failed!");
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            createOrder(paymentIntent)
            router.push("/news-feed")
        }

        setIsLoading(false);
    };

    const handlePaymentElementChange = (event: any) => {
        setIsPaymentElementComplete(event.complete);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg">
                <PaymentElement id="payment-element" onChange={handlePaymentElementChange} className="mb-4" />
                <Button
                    disabled={isLoading || !stripe || !elements || !isPaymentElementComplete}
                    id="submit"
                    className="w-full flex justify-center items-center bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-150 ease-in-out"
                >
                    {isLoading ? (
                        <div className="flex items-center space-x-2">
                            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-transparent border-white"></div>
                            <span>Processing...</span>
                        </div>
                    ) : (
                        "Pay now"
                    )}
                </Button>
                {message && (
                    <div
                        id="payment-message"
                        className={`mt-4 text-sm text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </form>
    );
};

export default CheckOutForm;
