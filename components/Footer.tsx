export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* עמודה ראשונה */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              על האפליקציה
            </h3>
            <p className="text-base text-gray-600">
              מערכת לבניית קורות חיים מקצועיים בעברית עם תמיכה מלאה ב-RTL ויצירת PDF איכותי.
            </p>
          </div>

          {/* עמודה שנייה */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              קישורים מהירים
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="text-base text-gray-600 hover:text-gray-900 transition-colors">
                  לוח הבקרה
                </a>
              </li>
              <li>
                <a href="/templates" className="text-base text-gray-600 hover:text-gray-900 transition-colors">
                  תבניות
                </a>
              </li>
            </ul>
          </div>

          {/* עמודה שלישית */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              יצירת קשר
            </h3>
            <p className="text-base text-gray-600">
              לתמיכה טכנית או שאלות כלליות, אנא צרו קשר דרך האימייל שלכם.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} מערכת קורות חיים. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
