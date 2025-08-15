import { ReactNode } from 'react';

export default function ChessAbilitiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
