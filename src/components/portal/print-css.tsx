/** Print rules shared by quotes and templates: only the `.print-area` is printed. */
export function PrintCss({ size = 'A4' }: { size?: string }) {
  return (
    <style>{`
      @page { size: ${size}; margin: 0; }
      .preview-zoom { zoom: var(--z, 0.8); }
      @media print {
        html, body { background: #fff !important; }
        body * { visibility: hidden !important; }
        .print-area, .print-area * { visibility: visible !important; }
        .print-area { position: absolute !important; left: 0; top: 0; margin: 0 !important; box-shadow: none !important; }
        .preview-zoom { zoom: 1 !important; }
        .no-print { display: none !important; }
        .print-page { break-after: page; }
        .print-page:last-child { break-after: auto; }
      }
    `}</style>
  );
}
