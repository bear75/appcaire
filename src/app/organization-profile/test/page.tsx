'use client';

import { useOrganization } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function TestOrganizationPage() {
  const { organization } = useOrganization();
  const [orgData, setOrgData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrgData();
  }, []);

  const fetchOrgData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/test-org');
      const data = await response.json();
      setOrgData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch organization data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const setOrgMetadata = async () => {
    if (!organization) return;
    
    try {
      setLoading(true);
      const response = await fetch('/api/set-org-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organizationId: organization.id,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to set organization metadata');
      }
      
      await fetchOrgData(); // Refresh data
      setError(null);
    } catch (err) {
      setError('Failed to set organization metadata');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Organization Test Page</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <Card className="p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Current Organization</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(organization, null, 2)}
        </pre>
      </Card>

      <Card className="p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Organization Data</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(orgData, null, 2)}
        </pre>
      </Card>

      <Button
        onClick={setOrgMetadata}
        disabled={loading || !organization}
      >
        Set Trial Metadata
      </Button>
    </div>
  );
} 