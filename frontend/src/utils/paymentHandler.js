import React, { useState } from 'react';

const PaymentHandler = ({ amount, onSuccess, onFailure }) => {
  const [loading, setLoading] = useState(false);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Call this function on button click
  const startPayment = async () => {
    setLoading(true);

    // 1. Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load Razorpay SDK');
      setLoading(false);
      return;
    }

    // 2. Create order on backend and get order details
    // Here you should call your backend API, but for demo I use dummy data:
    const order = {
      id: 'order_DBJOWzybf0sJbb', // replace with real order id from your backend
      amount: amount * 100, // in paise
      currency: 'INR',
    };

    // 3. Configure Razorpay options
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID',  // Replace with your Razorpay Key
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: 'Your Company Name',
      description: 'Test Transaction',
      handler: function (response) {
        // Payment succeeded
        onSuccess && onSuccess(response);
        setLoading(false);
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
          onFailure && onFailure('Payment cancelled');
        },
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    // 4. Open Razorpay checkout
    const rzp = new window.Razorpay(options);
    rzp.open();

    setLoading(false);
  };

  return (
    <button onClick={startPayment} disabled={loading}>
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  );
};

export default PaymentHandler;
