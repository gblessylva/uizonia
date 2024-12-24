import React from "react";

const NewsletterBox: React.FC = () => {
  return (
    <div className="bg-purple-800  z-40 relative text-white my-20 py-10 px-6 md:px-16 rounded-lg shadow-lg container mx-auto">
      <h2 className="text-3xl md:text-2xl font-bold text-center mb-4">
        Subscribe to our Newsletter
      </h2>
      <p className="text-gray-300 text-center mb-8">
        Get the latest updates, tips, and exclusive content straight to your inbox.
      </p>

      {/* Form */}
      <form
        action="#"
        method="post"
        className="flex flex-col md:flex-row justify-center gap-4"
      >
        {/* Email Input */}
        <div className="relative w-full md:w-2/3">
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 rounded-lg border-none text-gray-900 focus:ring focus:ring-purple-500 placeholder-gray-500"
          />
        </div>

        {/* Subscribe Button */}
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Subscribe
        </button>
      </form>

      {/* Disclaimer */}
      <p className="text-sm text-gray-400 text-center mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterBox;
