'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  features: string[];
}

const templates: Template[] = [
  {
    id: 'classic',
    name: 'קלאסי',
    description: 'תבנית נקייה ומקצועית המתאימה לכל תחום',
    preview: '📄',
    features: [
      'עיצוב נקי ומסודר',
      'מתאים לכל התחומים',
      'קל לקריאה',
      'מבנה מסורתי'
    ]
  },
  {
    id: 'modern',
    name: 'מודרני',
    description: 'תבנית עכשווית עם אלמנטים גרפיים מעניינים',
    preview: '🎨',
    features: [
      'עיצוב עכשווי',
      'אלמנטים ויזואליים',
      'מתאים לתחומים יצירתיים',
      'בולט ומרשים'
    ]
  }
];

export default function TemplatesPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleSelectTemplate = async (templateId: string) => {
    try {
      setLoading(templateId);
      
      // יצירת אובייקט cvData ריק
      const emptyCvData = {
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          address: '',
          linkedin: '',
          summary: ''
        },
        experience: [],
        education: [],
        skills: [],
        languages: [],
        militaryService: [],
        nationalService: [],
        drivingLicenses: [],
        customSections: [],
        additionalInfo: ''
      };

      // שליחת בקשה ליצירת CV חדש
      const response = await fetch('/api/save-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cvData: emptyCvData,
          templateId: templateId
        }),
      });

      if (!response.ok) {
        throw new Error('שגיאה ביצירת קורות חיים');
      }

      const { cvId } = await response.json();
      
      // העברה לעורך החדש
      router.push(`/editor/${cvId}`);
      
    } catch (error) {
      console.error('Error creating CV:', error);
      alert('שגיאה ביצירת קורות חיים. אנא נסה שוב.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">בחר תבנית</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          בחר את התבנית המתאימה ביותר עבור קורות החיים שלך. כל תבנית מותאמת לסגנונות שונים ותחומים שונים.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* תצוגה מקדימה */}
            <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <div className="text-6xl">{template.preview}</div>
            </div>

            {/* תוכן הכרטיס */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {template.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {template.description}
              </p>

              {/* תכונות */}
              <ul className="space-y-2 mb-6">
                {template.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="text-green-500 ml-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* כפתור בחירה */}
              <button
                onClick={() => handleSelectTemplate(template.id)}
                disabled={loading === template.id}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                  loading === template.id
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                }`}
              >
                {loading === template.id ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    יוצר...
                  </div>
                ) : (
                  'בחר תבנית זו'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* מידע נוסף */}
      <div className="mt-16 text-center">
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            💡 טיפ מועיל
          </h2>
          <p className="text-blue-800 text-lg">
            לא בטוח איזו תבנית לבחור? התבנית הקלאסית מתאימה לרוב המקצועות ונראית מקצועית בכל מצב.
            תוכל תמיד לשנות את התבנית מאוחר יותר.
          </p>
        </div>
      </div>
    </div>
  );
}
