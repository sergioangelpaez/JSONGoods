import { useState } from 'react';
import App from './App';
import Button from './components/Button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
// import ThemeToggle from './components/ThemeToggle';

const Welcome = ({ onStart }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-light-text-main mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-md bg-white p-10 shadow-md">
        <h1 className="text-5xl font-semibold">JSON Goods</h1>
        <p className="text-center">
          Discover and explore an extensive catalog of items with our modern web application! Built
          with React and Tailwind CSS, this project showcases a robust approach to frontend
          development.
        </p>

        <div className="text-left">
          <h2 className="mb-2 text-xl font-medium">Key Features:</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              ⚡️ <strong>Real-time Product Search:</strong> Instantly filter products with
              debounced input.
            </li>
            <li>
              🗂️ <strong>Dynamic Category Filtering:</strong> Categories fetched from{' '}
              <code>dummyjson.com</code>.
            </li>
            <li>
              📄 <strong>Intuitive Pagination:</strong> Easy navigation through product lists.
            </li>
            <li>
              🌙 <strong>Dark Mode Toggle:</strong> Theme preference is persisted.
            </li>
            <li>
              ✨ <strong>Enhanced User Feedback:</strong> Skeleton loading, error handling, and
              empty states.
            </li>
          </ul>
        </div>

        <p className="text-center">
          This app is a hands-on demo of modern, interactive frontend development. 🚀
        </p>

        <Button onClick={onStart}>
          <ShoppingCartIcon className="size-6" />
          <p className="text-md font-semibold">Start shopping</p>
        </Button>
      </div>
    </div>
  );
};

const Root = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="bg-light-bg-main h-screen">
      {!started ? <Welcome onStart={() => setStarted(true)} /> : <App />}
    </div>
  );
};

export default Root;
