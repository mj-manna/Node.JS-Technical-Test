import React, { useState, useEffect } from 'react';
import { murmursAPI } from '../services/api';
import { Murmur, PaginatedResponse } from '../types';
import MurmurCard from './MurmurCard';
import CreateMurmur from './CreateMurmur';
import Pagination from './Pagination';

const Timeline: React.FC = () => {
  const [murmurs, setMurmurs] = useState<Murmur[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMurmurs = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await murmursAPI.getTimeline(pageNum, 10);
      const data = response.data as PaginatedResponse<Murmur>;
      setMurmurs(data.data);
      setTotalPages(data.meta.totalPages);
    } catch (error) {
      console.error('Error fetching murmurs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMurmurs(page);
  }, [page]);

  const handleMurmurCreated = () => {
    fetchMurmurs(1);
    setPage(1);
  };

  const handleMurmurDeleted = () => {
    fetchMurmurs(page);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Timeline</h1>

      <CreateMurmur onMurmurCreated={handleMurmurCreated} />

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <div className="space-y-4 mt-6">
            {murmurs.map((murmur) => (
              <MurmurCard
                key={murmur.id}
                murmur={murmur}
                onDelete={handleMurmurDeleted}
              />
            ))}
          </div>

          {murmurs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No murmurs yet. Follow some users to see their posts!
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Timeline;