'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InsurancePensionRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/solutions/sports-innovation');
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to Sports Innovation & Technology Solutions...</p>
    </div>
  );
}
