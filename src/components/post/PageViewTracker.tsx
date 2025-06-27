'use client';

import { useEffect } from 'react';

const PageViewTracker = ({ slug }: { slug: string }) => {
  useEffect(() => {
    fetch('/api/pv', {
      method: 'POST',
      body: JSON.stringify({ slug }),
    });
  }, [slug]);

  return null;
};

export default PageViewTracker;
