import React, { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      console.log("Email submitted:", email);
    }
  };

  return (
    <section className="bg-indigo-700 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-indigo-100 mb-8">
          Subscribe to our newsletter to be the first to know about new arrivals
          and exclusive offers.
        </p>

        {submitted ? (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl text-green-400 bg-white py-4 rounded-lg">
              Your data successfully sent.we connect shortly.
            </h2>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg bg-blue-200 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="submit"
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Footer;
