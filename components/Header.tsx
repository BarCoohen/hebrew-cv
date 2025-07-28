'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* לוגו */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ק</span>
            </div>
            <span className="text-xl font-bold text-gray-900">קורות חיים</span>
          </Link>

          {/* ניווט */}
          <nav className="flex space-x-8 space-x-reverse">
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/dashboard' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              לוח הבקרה
            </Link>
            <Link 
              href="/templates" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/templates' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              תבניות
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
