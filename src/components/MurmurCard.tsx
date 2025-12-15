import React, { useState } from 'react';
import { Murmur } from '../types';
import { murmursAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MurmurCardProps {
  murmur: Murmur;
  onDelete?: () => void;
  showDelete?: boolean;
}

const MurmurCard: React.FC<MurmurCardProps> = ({ murmur, onDelete, showDelete = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(murmur.likeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const canDelete = user && user.id === murmur.userId;

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isLiked) {
        await murmursAPI.unlike(murmur.id);
        setLikeCount(prev => prev - 1);
      } else {
        await murmursAPI.like(murmur.id);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this murmur?')) return;

    setIsDeleting(true);
    try {
      await murmursAPI.delete(murmur.id);
      onDelete?.();
    } catch (error) {
      console.error('Error deleting murmur:', error);
      alert('Failed to delete murmur');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/users/${murmur.userId}`);
  };

  const handleCardClick = () => {
    navigate(`/murmurs/${murmur.id}`);
  };

  return (
    <div
      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="font-semibold hover:underline"
              onClick={handleUserClick}
            >
              {murmur.user.displayName || murmur.user.username}
            </span>
            <span className="text-gray-500 text-sm">
              @{murmur.user.username}
            </span>
            <span className="text-gray-400 text-sm">
              · {new Date(murmur.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-800 mb-3">{murmur.content}</p>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{likeCount}</span>
            </button>
          </div>
        </div>

        {(showDelete || canDelete) && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 ml-4"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MurmurCard;
