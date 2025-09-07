'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaCheckCircle, FaTimesCircle, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// Remove: import { useProtectedRoute } from '@/components/AuthContext';

export default function RedirectAddExtension() {
  const [extensions, setExtensions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    logo: '',
    description: '',
    features: '',
    version: '',
    developer: '',
    publisher: '',
    category: '',
    identifier: ''
  });
  const router = useRouter();
  const [search, setSearch] = useState('');
  // Remove: const { isAuthenticated, user, loading } = useProtectedRoute({ requireAdmin: true });
  // Remove: const [showUnauthorized, setShowUnauthorized] = React.useState(false);

  // Cloudinary configuration - replace with your actual values
  const CLOUDINARY_CLOUD_NAME = 'dhxn3h7vx'; // Replace with your cloud name
  const CLOUDINARY_UPLOAD_PRESET = 'extension'; // Replace with your upload preset

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image to Cloudinary');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        const res = await fetch('http://localhost:5000/extensions');
        const data = await res.json();
        setExtensions(data);
      } catch (err) {
        alert('Failed to fetch extensions: ' + err.message);
      }
    };
    fetchExtensions();
  }, []);

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(file);
        setForm({ ...form, logo: cloudinaryUrl });
      } catch (error) {
        alert('Error uploading image: ' + error.message);
        setImagePreview('');
      }
    }
  };

  // Add or update extension
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!form.name || !form.developer || !form.publisher || !form.category || !form.identifier || !form.version || !form.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare extension data
    const extensionData = {
      ...form,
      features: form.features ? form.features.split(',').map(f => f.trim()).filter(f => f) : [],
      published: false, // Default to unpublished
      stats: {
        downloads: 0,
        rating: 0
      }
    };

    if (editingId) {
      // Update extension via backend
      try {
        const res = await fetch(`http://localhost:5000/extensions/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(extensionData),
        });
        if (!res.ok) throw new Error('Failed to update extension');
        const updated = await res.json();
        setExtensions(extensions.map(ext => ext._id === editingId ? updated : ext));
        setEditingId(null);
        setForm({ name: '', logo: '', description: '', features: '', version: '', developer: '', publisher: '', category: '', identifier: '' });
        setImagePreview('');
        setShowForm(false);
        alert('Extension updated successfully!');
        return;
      } catch (err) {
        alert('Error updating extension: ' + err.message);
        return;
      }
    }
    // Add new extension via backend
    try {
      const res = await fetch('http://localhost:5000/extensions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(extensionData),
      });
      if (!res.ok) throw new Error('Failed to save extension');
      const saved = await res.json();
      setExtensions([...extensions, saved]);
      setForm({ name: '', logo: '', description: '', features: '', version: '', developer: '', publisher: '', category: '', identifier: '' });
      setImagePreview('');
      setShowForm(false);
      alert('Extension added successfully!');
    } catch (err) {
      alert('Error saving extension: ' + err.message);
    }
  };

  // Edit extension
  const handleEdit = (ext) => {
    setEditingId(ext._id);
    setForm({
      name: ext.name,
      logo: ext.logo,
      description: ext.description,
      features: ext.features.join(', '),
      version: ext.version || '',
      developer: ext.developer || '',
      publisher: ext.publisher || '',
      category: ext.category || '',
      identifier: ext.identifier || ''
    });
    // If logo is already a Cloudinary URL, use it directly
    setImagePreview(ext.logo || '');
    setShowForm(true);
  };

  // Delete extension
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this extension?')) {
      try {
        const res = await fetch(`http://localhost:5000/extensions/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete extension');
        setExtensions(extensions.filter(ext => ext._id !== id));
      } catch (err) {
        alert('Error deleting extension: ' + err.message);
      }
    }
  };

  // Toggle publish
  const handleTogglePublish = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/extensions/${id}/publish`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to toggle publish');
      const updated = await res.json();
      setExtensions(extensions.map(ext => ext._id === id ? updated : ext));
    } catch (err) {
      alert('Error toggling publish: ' + err.message);
    }
  };

  // Filtered extensions
  const filtered = extensions.filter(ext =>
    ext.name.toLowerCase().includes(search.toLowerCase()) ||
    ext.description.toLowerCase().includes(search.toLowerCase())
  );

  // Remove: useEffect(() => {
  // Remove:   if (!loading && isAuthenticated && user?.type !== 'admin') {
  // Remove:     setShowUnauthorized(true);
  // Remove:     const timer = setTimeout(() => {
  // Remove:       router.replace('/');
  // Remove:     }, 2000);
  // Remove:     return () => clearTimeout(timer);
  // Remove:   }
  // Remove: }, [isAuthenticated, loading, user, router]);

  // Remove: if (loading) return <div>Loading...</div>;
  // Remove: if (showUnauthorized) return <div className="text-red-600 text-center mt-10 text-xl font-bold">Unauthorized: You do not have access to this page.</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Extension Management</h1>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: '', logo: '', description: '', features: '', version: '', developer: '', publisher: '', category: '', identifier: '' }); setImagePreview(''); }}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
        >
          <FaPlus /> Add Extension
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search extensions..."
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 w-full md:w-1/2"
        />
      </div>

      {/* Extension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ext => (
          <div key={ext._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col relative group border border-gray-100 hover:shadow-2xl transition">
            <div className="flex items-center gap-4 mb-3">
              <img src={ext.logo || '/file.svg'} alt="logo" className="w-14 h-14 rounded border bg-gray-50 object-cover" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  {ext.name}
                  {ext.published ? (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full ml-2"><FaCheckCircle className="mr-1" />Published</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-600 rounded-full ml-2"><FaTimesCircle className="mr-1" />Unpublished</span>
                  )}
                </h2>
                <div className="text-sm text-gray-500">v{ext.version}</div>
                <div className="text-xs text-gray-400">By {ext.developer}</div>
              </div>
            </div>
            <p className="text-gray-700 mb-2 line-clamp-2 min-h-[40px]">{ext.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {ext.features.slice(0, 3).map((f, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">{f}</span>
              ))}
              {ext.features.length > 3 && <span className="text-xs text-gray-400">+{ext.features.length - 3} more</span>}
            </div>
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                <span className="font-semibold">{ext.stats.downloads}</span> downloads<br />
                <span className="font-semibold">⭐ {ext.stats.rating}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowDetails(ext)} className="p-2 rounded hover:bg-blue-50 text-blue-600" title="View Details"><FaEye /></button>
                <button onClick={() => handleEdit(ext)} className="p-2 rounded hover:bg-yellow-100 text-yellow-600" title="Edit"><FaEdit /></button>
                <button onClick={() => handleDelete(ext._id)} className="p-2 rounded hover:bg-red-100 text-red-600" title="Delete"><FaTrash /></button>
                <button onClick={() => handleTogglePublish(ext._id)} className={`p-2 rounded ${ext.published ? 'hover:bg-green-100 text-green-600' : 'hover:bg-gray-200 text-gray-500'}`} title={ext.published ? 'Unpublish' : 'Publish'}>
                  {ext.published ? <FaTimesCircle /> : <FaCheckCircle />}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-10">No extensions found.</div>
        )}
      </div>

      {/* Add/Edit Extension Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn">
            <button onClick={() => { setShowForm(false); setEditingId(null); setForm({ name: '', logo: '', description: '', features: '', version: '', developer: '', publisher: '', category: '', identifier: '' }); setImagePreview(''); }} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700">&times;</button>
            <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Extension' : 'Add New Extension'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Extension Name</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Developer</label>
                <input required value={form.developer} onChange={e => setForm({ ...form, developer: e.target.value })} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Publisher</label>
                <input required value={form.publisher} onChange={e => setForm({ ...form, publisher: e.target.value })} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200">
                  <option value="">Select a category</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Communication">Communication</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Education">Education</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Identifier</label>
                <input required value={form.identifier} onChange={e => setForm({ ...form, identifier: e.target.value })} placeholder="unique-extension-id" className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Logo Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" />
                {uploading && (
                  <div className="mt-2 text-sm text-blue-600">Uploading to Cloudinary...</div>
                )}
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded border" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Version</label>
                <input required value={form.version} onChange={e => setForm({ ...form, version: e.target.value })} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Features <span className="text-gray-400">(comma separated)</span></label>
                <input value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200 min-h-[80px]" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm({ name: '', logo: '', description: '', features: '', version: '', developer: '', publisher: '', category: '', identifier: '' }); setImagePreview(''); }} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow">{editingId ? 'Update' : 'Add'} Extension</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Extension Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative animate-fadeIn">
            <button onClick={() => setShowDetails(null)} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700">&times;</button>
            <div className="flex items-center gap-4 mb-4">
              <img src={showDetails.logo || '/file.svg'} alt="logo" className="w-16 h-16 rounded border bg-gray-50 object-cover" />
              <div>
                <h2 className="text-2xl font-bold">{showDetails.name}</h2>
                <span className="text-gray-500">v{showDetails.version}</span>
                <div className="text-xs text-gray-400">By {showDetails.developer}</div>
              </div>
            </div>
            <p className="mb-2 text-gray-700">{showDetails.description}</p>
            <h3 className="font-semibold mt-4 mb-1">Features:</h3>
            <ul className="list-disc list-inside mb-2 text-gray-700">
              {showDetails.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <div className="mb-2">Published: <b>{showDetails.published ? 'Yes' : 'No'}</b></div>
            <div className="mb-2">Downloads: <b>{showDetails.stats.downloads}</b></div>
            <div className="mb-2">Rating: <b>{showDetails.stats.rating}</b></div>
          </div>
        </div>
      )}
    </div>
  );
}
