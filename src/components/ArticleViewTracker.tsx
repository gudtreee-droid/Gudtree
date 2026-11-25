'use client';

import { useEffect } from 'react';

interface ArticleViewTrackerProps {
  slug: string;
}

export default function ArticleViewTracker({ slug }: ArticleViewTrackerProps) {
  useEffect(() => {
    if (!slug || typeof window === 'undefined') return;

    const sessionKey = `viewed_${slug}`;
    const alreadyViewed = sessionStorage.getItem(sessionKey);

    // Track view (pass isUnique if first time visiting the site today)
    const visitorKey = 'gudtree_visitor_tracked';
    const isNewVisitor = !localStorage.getItem(visitorKey);

    if (!alreadyViewed) {
      sessionStorage.setItem(sessionKey, '1');
      if (isNewVisitor) {
        localStorage.setItem(visitorKey, Date.now().toString());
      }

      const timer = setTimeout(() => {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            slug,
            isUnique: isNewVisitor,
          }),
        }).catch(() => {});
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [slug]);

  return null;
}
