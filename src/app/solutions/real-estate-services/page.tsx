'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RealEstateServicesRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/solutions/sports-tourism');
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to Sports Tourism & International Hosting...</p>
    </div>
  );
}
