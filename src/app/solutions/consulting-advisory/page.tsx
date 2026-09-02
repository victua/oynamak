'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConsultingAdvisoryRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/solutions/strategic-partnerships');
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to Strategic Partnerships & Ecosystem Development...</p>
    </div>
  );
}
