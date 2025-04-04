"use client";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 rounded-lg">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Your payment has been processed successfully. You are now a pro user
          with unlimited file uploads.
        </p>
        <Button
          className="mt-6 px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
