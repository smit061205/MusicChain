import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900'
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />,
    error: <XCircle className="w-5 h-5 text-red-600" strokeWidth={2.5} />,
    info: <Info className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
  };

  return (
    <div className={`fixed top-24 right-8 z-50 animate-slide-in-right ${styles[type]} border-2 rounded-2xl p-4 shadow-xl max-w-md flex items-center gap-3`}>
      {icons[type]}
      <p className="flex-1 text-[0.875rem] font-semibold">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-lg transition-colors">
        <X className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default Toast;
