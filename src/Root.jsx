import { useState } from 'react';
import App from './App';
import Button from './components/Button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Welcome = ({ onStart }) => {
  return (
    <div className="bg-bg-main flex h-full w-full items-center justify-center p-4 sm:p-10 md:p-0">
      <div className="text-text-main bg-card-bg mx-auto flex max-w-3xl flex-col items-center gap-4 overflow-y-auto rounded-md p-4 shadow-md sm:gap-5 sm:p-5 md:p-10">
        {/* Título */}
        <h1 className="text-accent text-center text-3xl font-semibold sm:text-4xl md:text-5xl">
          JSON Goods
        </h1>

        {/* Intro */}
        <p className="text-center text-sm leading-relaxed sm:text-base">
          Discover and explore an extensive catalog of items with our modern web application! Built
          with React and Tailwind CSS, this project showcases a robust approach to frontend
          development.
        </p>

        {/* Features */}
        <div className="w-full text-left">
          <h2 className="mb-2 text-center text-lg font-medium sm:text-left sm:text-xl">
            Key Features:
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed sm:space-y-2 sm:text-base">
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

        {/* Outro */}
        <p className="text-center text-sm leading-relaxed sm:text-base">
          This app is a hands-on demo of modern, interactive frontend development. 🚀
        </p>

        {/* CTA */}
        <Button onClick={onStart} className="w-full sm:w-auto">
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
    <div className="bg-light-bg-main dark:bg-dark-bg-main h-[100dvh]">
      {!started ? <Welcome onStart={() => setStarted(true)} /> : <App />}
    </div>
  );
};

export default Root;
