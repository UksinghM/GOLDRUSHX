'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

const RequestExtensionPage = () => {
  const [form, setForm] = useState({
    name: '',
    publisher: '',
    identifier: '',
    version: '',
    logo: '',
    description: '',
    confirm: false,
  });
  const [logoPreview, setLogoPreview] = useState('');
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });
  const [validation, setValidation] = useState({ loading: false, valid: false, error: '' });

  // Fetch user's pending submissions (replace with real userId)
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    axios.get(`${API_BASE}/extensions?published=false&user=${userId}`)
      .then(res => setPending(res.data))
      .catch(() => setPending([]));
  }, [toast]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'publisher' || name === 'identifier') {
      setValidation({ loading: false, valid: false, error: '' });
    }
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, logo: reader.result }));
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Validate extension existence
  const handleValidate = async () => {
    setValidation({ loading: true, valid: false, error: '' });
    try {
      const { publisher, identifier } = form;
      if (!publisher || !identifier) {
        setValidation({ loading: false, valid: false, error: 'Enter publisher and identifier.' });
        return;
      }
      // Encode publisher and identifier to ensure valid URL
      const res = await axios.get(`${API_BASE}/extensions/api/validate-extension?publisher=${encodeURIComponent(publisher)}&identifier=${encodeURIComponent(identifier)}`);
      if (res.data.valid) {
        setValidation({ loading: false, valid: true, error: '' });
        setToast({ type: 'success', message: 'Extension found on Marketplace!' });
      } else {
        setValidation({ loading: false, valid: false, error: 'Extension not found on Marketplace.' });
        setToast({ type: 'error', message: 'Extension not found on Marketplace.' });
      }
    } catch {
      setValidation({ loading: false, valid: false, error: 'Validation failed.' });
      setToast({ type: 'error', message: 'Validation failed.' });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.publisher || !form.identifier || !form.version || !form.logo || !form.description || !form.confirm || !validation.valid) {
      setToast({ type: 'error', message: 'Please fill all fields, validate, and confirm.' });
      return;
    }
    setLoading(true);
    try {
      // Add published: false and user (if available) to the payload
      const userId = localStorage.getItem('userId');
      await axios.post(`${API_BASE}/extensions`, {
        ...form,
        published: false
      });
      setToast({ type: 'success', message: 'Extension submitted for approval!' });
      setForm({ name: '', publisher: '', identifier: '', version: '', logo: '', description: '', confirm: false });
      setLogoPreview('');
      setValidation({ loading: false, valid: false, error: '' });
    } catch (err) {
      setToast({ type: 'error', message: 'Submission failed. Try again.' });
    }
    setLoading(false);
  };

  // Toast auto-dismiss
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ type: '', message: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-white pt-16 py-12 px-4">
      <div className="max-w-3xl mx-auto rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Request Extension</h1>
        {/* Toast */}
        {toast.message && (
          <div className={`mb-4 px-4 py-2 rounded font-semibold ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {toast.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Extension Name */}
          <div>
            <label className="block mb-1">Extension Name</label>
            <input
              type="text"
              name="name"
              className="w-full rounded border px-3 py-2"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* Publisher Name */}
          <div>
            <label className="block mb-1">Publisher Name</label>
            <input
              type="text"
              name="publisher"
              className="w-full rounded border px-3 py-2"
              value={form.publisher}
              onChange={handleChange}
              required
            />
          </div>
          {/* Extension Identifier */}
          <div>
            <label className="block mb-1">Extension Identifier <span className="text-xs text-gray-400">(e.g. es7-react-js-snippets)</span></label>
            <div className="flex gap-2">
              <input
                type="text"
                name="identifier"
                className="flex-1 rounded border px-3 py-2"
                value={form.identifier}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={handleValidate}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                disabled={validation.loading || !form.publisher || !form.identifier}
              >
                {validation.loading ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" /></svg>
                    Validating...
                  </span>
                ) : 'Validate'}
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2 min-h-[28px]">
              {validation.valid && (
                <>
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Extension found on Marketplace</span>
                </>
              )}
              {!validation.valid && validation.error && (
                <>
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">{validation.error}</span>
                </>
              )}
            </div>
          </div>
          {/* Version */}
          <div>
            <label className="block mb-1">Version</label>
            <input
              type="text"
              name="version"
              className="w-full rounded border px-3 py-2"
              value={form.version}
              onChange={handleChange}
              required
            />
          </div>
          {/* Logo Upload */}
          <div>
            <label className="block mb-1">Logo Upload</label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={handleLogoUpload}
            />
            {logoPreview && (
              <div className="mt-2">
                <img src={logoPreview} alt="Logo Preview" className="h-16 w-16 rounded shadow" />
              </div>
            )}
          </div>
          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              className="w-full rounded border px-3 py-2 min-h-[60px]"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          {/* Confirmation Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="confirm"
              checked={form.confirm}
              onChange={handleChange}
              className="mr-2 accent-indigo-600"
              required
            />
            <span>I confirm the above information is accurate</span>
          </div>
          {/* Preview Card */}
          {validation.valid && form.name && form.publisher && form.identifier && form.version && form.logo && form.description && (
            <div className="mt-6">
              <div className="border rounded-xl p-4 flex items-center gap-4 shadow">
                <img src={logoPreview} alt="Logo" className="h-16 w-16 rounded" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{form.name}</span>
                    <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">{form.version}</span>
                  </div>
                  <div className="text-gray-700 text-sm">{form.description}</div>
                  <div className="text-gray-500 text-xs mt-1">Publisher: {form.publisher}</div>
                  <div className="text-gray-500 text-xs">Identifier: {form.identifier}</div>
                </div>
              </div>
            </div>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-full shadow transition ${(!validation.valid || loading) ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={!validation.valid || loading}
          >
            {loading ? 'Submitting...' : 'Submit for Approval'}
          </button>
        </form>
      </div>
      {/* Pending Submissions Table */}
      <div className="max-w-3xl mx-auto mt-12 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Pending Submissions</h2>
        {pending.length === 0 ? (
          <div className="text-gray-500">No pending submissions.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Version</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {pending.map(ext => (
                <tr key={ext._id} className="border-t">
                  <td className="py-2">{ext.name}</td>
                  <td className="py-2">{ext.version}</td>
                  <td className="py-2">
                    <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">Pending Approval</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RequestExtensionPage; 