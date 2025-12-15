import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { murmursAPI } from '../services/api';
import { Murmur } from '../types';
import MurmurCard from '../components/MurmurCard';

const MurmurDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [murmur, setMurmur] = useState<Murmur | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMurmur = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await murmursAPI.getOne(Number(id));
        setMurmur(response.data);
      } catch (error) {
        console.error('Error fetching murmur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMurmur();
  }, [id]);

  const handleDelete = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto p-4">Loading...</div>;
  }

  if (!murmur) {
    return <div className="max-w-2xl mx-auto p-4">Murmur not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Murmur Detail</h1>

      <MurmurCard murmur={murmur} onDelete={handleDelete} />
    </div>
  );
};

export default MurmurDetail;
