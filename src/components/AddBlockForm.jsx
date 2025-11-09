import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddBlockForm = ({ onAddBlock }) => {
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.trim()) {
      onAddBlock(data);
      setData('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter block data (e.g., 'Transfer $100 to Alice')"
        className="flex-1 px-5 py-3.5 border-2 border-slate-200 rounded-xl text-[0.9375rem] text-slate-900 font-medium tracking-[-0.011em] placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
      <button
        type="submit"
        className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 text-white text-[0.9375rem] font-semibold tracking-[-0.011em] rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <Plus className="w-5 h-5" strokeWidth={2.5} />
        Add Block
      </button>
    </form>
  );
};

export default AddBlockForm;
