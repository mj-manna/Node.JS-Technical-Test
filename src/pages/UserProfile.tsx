import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usersAPI } from '../services/api';
import { User, Murmur } from '../types';
import { useAuth } from '../context/AuthContext';
import MurmurCard from '../components/MurmurCard';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [murmurs, setMurmurs] = useState<Murmur[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = currentUser?.id === Number(id);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const [userResponse, murmursResponse] = await Promise.all([
          usersAPI.getUser(Number(id)),
          usersAPI.getUserMurmurs(Number(id)),
        ]);

        setUser(userResponse.data);
        setMurmurs(murmursResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleFollow = async () => {
    if (!id) return;

    try {
      if (isFollowing) {
        await usersAPI.unfollow(Number(id));
      } else {
        await usersAPI.follow(Number(id));
      }
      setIsFollowing(!isFollowing);

      // Refresh user data to update follower count
      const userResponse = await usersAPI.getUser(Number(id));
      setUser(userResponse.data);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const handleMurmurDeleted = async () => {
    if (!id) return;
    const murmursResponse = await usersAPI.getUserMurmurs(Number(id));
    setMurmurs(murmursResponse.data);
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto p-4">Loading...</div>;
  }

  if (!user) {
    return <div className="max-w-2xl mx-auto p-4">User not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{user.displayName || user.username}</h1>
            <p className="text-gray-500">@{user.username}</p>
            {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
          </div>

          {!isOwnProfile && currentUser && (
            <button
              onClick={handleFollow}
              className={`px-4 py-2 rounded ${isFollowing
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>

        <div className="flex gap-4 mt-4 text-sm">
          <div>
            <span className="font-semibold">{user.followingCount || 0}</span>
            <span className="text-gray-500"> Following</span>
          </div>
          <div>
            <span className="font-semibold">{user.followerCount || 0}</span>
            <span className="text-gray-500"> Followers</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">
          {isOwnProfile ? 'Your Murmurs' : 'Murmurs'}
        </h2>

        {murmurs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No murmurs yet
          </div>
        ) : (
          <div className="space-y-4">
            {murmurs.map((murmur) => (
              <MurmurCard
                key={murmur.id}
                murmur={murmur}
                onDelete={handleMurmurDeleted}
                showDelete={isOwnProfile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
