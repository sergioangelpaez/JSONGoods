import { useEffect } from 'react';
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Toast = ({ title = '', message = '', variant = 'message', onClose }) => {
  if (!message) return null;

  const baseClasses =
    'relative grid grid-cols-[auto_1fr] gap-5 rounded-md px-4 py-3 shadow-lg pr-10 overflow-hidden';

  const variantClasses = {
    message: {
      containerClass: 'bg-accent text-white',
      icon: <InformationCircleIcon className="size-8" />,
      duration: 5000,
      progressClass: 'bg-purple-900/60',
    },
    warning: {
      containerClass: 'bg-yellow-500 text-black',
      icon: (
        <ExclamationTriangleIcon className="size-8" data-testid="heroicon-exclamation-triangle" />
      ),
      duration: 10000,
      progressClass: 'bg-yellow-700/70',
    },
    error: {
      containerClass: 'bg-red-600 text-white',
      icon: <XCircleIcon className="size-8" />,
      duration: null,
      progressClass: 'bg-red-800/70',
    },
    success: {
      containerClass: 'bg-green-600 text-white',
      icon: <XCircleIcon className="size-8" />,
      duration: 5000,
      progressClass: 'bg-green-800/70',
    },
  };

  const duration = variantClasses[variant]?.duration;

  // Auto close effect
  useEffect(() => {
    if (!duration || !onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${baseClasses} ${variantClasses[variant].containerClass}`} role="alert">
      {duration && (
        <div className="absolute top-0 left-0 h-1 w-full opacity-60">
          <div
            className={`h-1 ${variantClasses[variant].progressClass} transition-all ease-linear`}
            style={{
              width: '100%',
              animation: `shrink ${duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="absolute top-2 right-2 cursor-pointer rounded-md p-1 opacity-80 transition hover:bg-black/20 hover:opacity-100 focus:ring-2 focus:ring-white/60 focus:outline-none"
        >
          <XMarkIcon className="size-5" />
        </button>
      )}

      <div className="flex items-start pt-0.5">{variantClasses[variant].icon}</div>
      <div className="flex flex-col">
        <p className="leading-tight font-semibold">{title}</p>
        <p className="text-sm leading-snug">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
