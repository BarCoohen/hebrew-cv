import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { headers } from 'next/headers' // <-- יבא את headers

const rubik = Rubik({ 
  subsets: ['hebrew', 'latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'צור קורות חיים מקצועיים',
  description: 'צרו קורות חיים מקצועיים בעברית תוך דקות ספורות',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // קוראים את ה-headers של הבקשה הנוכחית
  const headerList = await headers();
  // בודקים אם ה-"סימן הסודי" שלנו קיים
  const isPdfRender = headerList.get('X-Render-For-PDF') === 'true';

  return (
    <html lang="he" dir="rtl">
      <body className={`${rubik.className} antialiased`}>
        
        {/* תנאי פשוט: אם זו לא הדפסה ל-PDF, הצג את ה-Header */}
        {!isPdfRender && <Header />}
        
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* תנאי פשוט: אם זו לא הדפסה ל-PDF, הצג את ה-Footer */}
        {!isPdfRender && <Footer />}

      </body>
    </html>
  )
}
