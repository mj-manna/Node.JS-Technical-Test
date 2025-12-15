import React, { useState } from 'react';
import { murmursAPI } from '../services/api';

interface CreateMurmurProps {
  onMurmurCreated: () => void;
}

const CreateMurmur: React.FC<CreateMurmurProps> = ({ onMurmurCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    setLoading(true);
    try {
      await murmursAPI.create(content);
      setContent('');
      onMurmurCreated();
    } catch (error) {
      console.error('Error creating murmur:', error);
      alert('Failed to create murmur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded resize-none"
        rows={3}
        maxLength={280}
        disabled={loading}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{content.length}/280</span>
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? 'Posting...' : 'Post Murmur'}
        </button>
      </div>
    </form>
  );
};

export default CreateMurmur;