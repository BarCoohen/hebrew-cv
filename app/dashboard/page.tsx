'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CV {
  cvId: string;
  title: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
  personalInfo: {
    fullName: string;
    email: string;
  };
}

export default function DashboardPage() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/get-all-cvs');
      
      if (!response.ok) {
        throw new Error('שגיאה בטעינת נתונים');
      }

      const data = await response.json();
      setCvs(data.cvs || []);
    } catch (err) {
      setError('שגיאה בטעינת רשימת קורות החיים');
      console.error('Error fetching CVs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center" dir="rtl">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">טוען קורות חיים...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center" dir="rtl">
          <div className="text-red-600 text-xl mb-4">❌</div>
          <p className="text-lg text-red-600">{error}</p>
          <button
            onClick={fetchCVs}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">לוח הבקרה</h1>
        <p className="text-lg text-gray-600">נהל את כל קורות החיים שלך במקום אחד</p>
      </div>

      {/* כפתור יצירת קורות חיים חדשים */}
      <div className="mb-8">
        <Link
          href="/templates"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <span className="ml-2">+</span>
          צור קורות חיים חדשים
        </Link>
      </div>

      {/* רשימת קורות החיים */}
      {cvs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">אין קורות חיים עדיין</h3>
          <p className="text-base text-gray-600 mb-6">
            התחל על ידי יצירת קורות החיים הראשונים שלך
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <span className="ml-2">+</span>
            צור קורות חיים
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {cvs.map((cv) => (
            <div
              key={cv.cvId}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {cv.title}
                    </h3>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                      <span>📧 {cv.personalInfo.email || 'ללא אימייל'}</span>
                      <span>🎨 תבנית: {cv.templateId}</span>
                      <span>📅 עודכן: {formatDate(cv.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Link
                      href={`/editor/${cv.cvId}`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      ✏️ ערוך
                    </Link>
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/generate-pdf', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ cvId: cv.cvId }),
                          });

                          if (response.ok) {
                            const blob = await response.blob();
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.style.display = 'none';
                            a.href = url;
                            a.download = `cv_${cv.cvId}.pdf`;
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                          } else {
                            alert('שגיאה ביצירת PDF');
                          }
                        } catch {
                          alert('שגיאה ביצירת PDF');
                        }
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      📄 הורד PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
