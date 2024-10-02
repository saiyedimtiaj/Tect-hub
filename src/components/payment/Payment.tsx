"use client"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { envConfig } from "@/config/envConfig";
import CheckOutForm from "./CheckOutForm";
const stripePromise = loadStripe("pk_test_51OECa6JppFDY8B5jfeGOAt0HVDsH1z8BZu6NSWOsW99PJxw0EOfetFMN9MvhEsirRD6UHDNyKqotJ7V5bHqbmBc300bsjMYMxS");

const Payment = () => {
    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        const amount = Math.round(20 * 100);
        axios.post(`${envConfig.baseApi}/payment/create-payment-intent`, { amount })
            .then(res => {
                setClientSecret(res.data?.data)
            })
    }, [clientSecret]);
    return (
        <div>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{
                    clientSecret: clientSecret, appearance: { theme: "flat" }
                }}>
                    <CheckOutForm />
                </Elements>
            )}
        </div>
    )
}

export default Payment
