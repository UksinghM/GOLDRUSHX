'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const AddExtension = () => {
  const [formData, setFormData] = useState({
    name: '',
    publisher: '',
    identifier: '',
    version: '',
    logo: '',
    description: '',
    published: false
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log('Sending POST to: http://localhost:5000/extensions');
      console.log('Payload:', formData);
      const response = await fetch('http://localhost:5000/extensions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      console.log('Response status:', response.status);
      const text = await response.text();
      console.log('Response body:', text);
      if (!response.ok) throw new Error(`Failed to save extension: ${text}`);
      const data = JSON.parse(text);
      setSuccess('Extension saved successfully!');
      setFormData({
        name: '', publisher: '', identifier: '', version: '', logo: '', description: '', published: false
      });
    } catch (err) {
      console.error('Error saving extension:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-lg mx-auto bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Add New Extension</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="publisher" className="text-white">Publisher</Label>
                <Input
                  id="publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="identifier" className="text-white">Identifier</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="version" className="text-white">Version</Label>
                <Input
                  id="version"
                  name="version"
                  value={formData.version}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="logo" className="text-white">Logo URL</Label>
                <Input
                  id="logo"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Save Extension
              </Button>
              {success && <p className="text-green-500">{success}</p>}
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddExtension;