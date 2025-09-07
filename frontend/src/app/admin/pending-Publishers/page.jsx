'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PendingPublishers() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/publisher/pending')
      .then(res => setPending(res.data));
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.post(`http://localhost:5000/publisher/${action}/${id}`);
      setPending(pending.filter(pub => pub._id !== id));
      toast.success(`Publisher ${action}d`);
    } catch {
      toast.error('Action failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Pending Publisher Registrations</h2>
      {pending.length === 0 ? (
        <p>No pending registrations.</p>
      ) : (
        <ul>
          {pending.map(pub => (
            <li key={pub._id} className="flex justify-between items-center border-b py-2">
              <span>{pub.name} ({pub.email})</span>
              <div>
                <button onClick={() => handleAction(pub._id, 'approve')} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Approve</button>
                <button onClick={() => handleAction(pub._id, 'deny')} className="bg-red-500 text-white px-3 py-1 rounded">Deny</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}