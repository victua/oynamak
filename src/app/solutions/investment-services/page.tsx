'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InvestmentServicesRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/solutions/products-equipment');
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to Sports Products & Equipment Solutions...</p>
    </div>
  );
}
