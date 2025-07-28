export default function WelcomeSection({ onStart }) {
  return (
    <div className="flex flex-col items-center text-light-text-main gap-5 max-w-3xl mx-auto p-10 bg-white rounded-md shadow-md">
      <h1 className="text-5xl font-semibold">JSON Goods</h1>

      <p className="text-center">
        Discover and explore an extensive catalog of items with our modern web application! Built with React and Tailwind CSS, this project showcases a robust approach to frontend development.
      </p>

      <div className="text-left">
        <h2 className="text-xl font-medium mb-2">Key Features:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            ⚡️ <strong>Real-time Product Search:</strong> Instantly filter products with debounced input.
          </li>
          <li>
            🗂️ <strong>Dynamic Category Filtering:</strong> Categories fetched from <code>dummyjson.com</code>.
          </li>
          <li>
            📄 <strong>Intuitive Pagination:</strong> Easy navigation through product lists.
          </li>
          <li>
            🌙 <strong>Dark Mode Toggle:</strong> Theme preference is persisted.
          </li>
          <li>
            ✨ <strong>Enhanced User Feedback:</strong> Skeleton loading, error handling, and empty states.
          </li>
        </ul>
      </div>

      <p className="text-center">
        This app is a hands-on demo of modern, interactive frontend development. 🚀
      </p>

      <button
        onClick={onStart}
        className="mt-4 px-6 py-2 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl shadow transition cursor-pointer flex items-center gap-3"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
        </svg>
        <span>Start Shopping</span>
        </button>
    </div>
  );
}