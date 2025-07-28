import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            צרו קורות חיים
            <span className="text-blue-600 block mt-2">מקצועיים תוך דקות</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            בנו קורות חיים מרשימים בעברית עם עיצוב מודרני ומקצועי. 
            הורידו כקובץ PDF איכותי ובחינם.
          </p>
          <Link 
            href="/templates"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            התחילו עכשיו
          </Link>
        </header>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">תבניות מקצועיות</h3>
            <p className="text-gray-600">תבניות מעוצבות במיוחד לשוק העבודה הישראלי</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">הורדה מהירה</h3>
            <p className="text-gray-600">הורידו את קורות החיים כקובץ PDF איכותי</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">מהיר וקל</h3>
            <p className="text-gray-600">ממשק פשוט ונוח לשימוש ללא הרשמה</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            מוכנים להתחיל?
          </h2>
          <p className="text-gray-600 mb-6">
            צרו קורות חיים מקצועיים שיבדילו אתכם מהמתחרים
          </p>
          <Link 
            href="/templates"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
          >
            צרו קורות חיים עכשיו
          </Link>
        </div>
      </div>
    </div>
  )
}
