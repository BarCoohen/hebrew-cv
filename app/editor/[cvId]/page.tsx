'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import CVEditor from '@/components/CVEditor'
import CVPreview from '@/components/CVPreview'
import { CVData } from '@/types/cv'

// פונקציה ליצירת נתוני CV ריקים
function createEmptyCV(): CVData {
  return {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    militaryService: [],
    nationalService: [],
    drivingLicenses: [],
    customSections: []
  }
}

interface EditorPageProps {
  params: Promise<{ cvId: string }>
}

export default function EditorPage({ params }: EditorPageProps) {
  const [cvData, setCvData] = useState<CVData>(() => createEmptyCV())
  const [templateId, setTemplateId] = useState<string>('classic')
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [cvId, setCvId] = useState<string | null>(null)
  const router = useRouter()

  // שמירת הגרסה העדכנית של cvData ב-ref לשימוש ב-cleanup
  const cvDataRef = useRef<CVData>(cvData)

  // עדכון ה-ref כל פעם ש-cvData משתנה
  useEffect(() => {
    cvDataRef.current = cvData
  }, [cvData])

  // שמירה סופית בזמן יציאה מהעמוד
  useEffect(() => {
    const saveOnUnmount = () => {
      console.log('🔄 מתחיל שמירה סופית בזמן יציאה מהעמוד...')
      
      const currentCvData = cvDataRef.current
      const currentCvId = cvId
      
      if (!currentCvId) {
        console.log('❌ אין cvId, מבטל שמירה סופית')
        return
      }

      // בודקים אם יש כל תוכן בכלל
      const hasAnyContent = 
        Object.values(currentCvData.personalInfo).some(value => value && value.trim()) ||
        currentCvData.experience.length > 0 ||
        currentCvData.education.length > 0 ||
        currentCvData.skills.length > 0 ||
        currentCvData.languages.length > 0 ||
        currentCvData.militaryService.length > 0 ||
        currentCvData.nationalService.length > 0 ||
        currentCvData.drivingLicenses.length > 0 ||
        currentCvData.customSections.length > 0

      if (hasAnyContent) {
        console.log('📤 יש תוכן לשמירה, מבצע שמירה סופית...')
        const dataToSave = JSON.stringify({ ...currentCvData, id: currentCvId })
        
        // ניסיון ראשון: navigator.sendBeacon (מיועד בדיוק למקרים כאלה)
        if (navigator.sendBeacon) {
          const blob = new Blob([dataToSave], { type: 'application/json' })
          const success = navigator.sendBeacon('/api/save-cv', blob)
          if (success) {
            console.log('✅ שמירה סופית הצליחה עם sendBeacon')
            return
          }
        }

        // ניסיון שני: fetch סינכרוני (fallback)
        try {
          fetch('/api/save-cv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: dataToSave,
            keepalive: true // עוזר לוודא שהבקשה תסתיים גם אם העמוד נסגר
          }).then(() => {
            console.log('✅ שמירה סופית הצליחה עם fetch keepalive')
          }).catch(error => {
            console.error('❌ שגיאה בשמירה סופית:', error)
          })
        } catch (error) {
          console.error('❌ שגיאה בשמירה סופית:', error)
        }
      } else {
        console.log('ℹ️ אין תוכן לשמירה, מדלג על שמירה סופית')
      }
    }

    // הוספת event listener ל-beforeunload לשמירה אחרונה
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      saveOnUnmount()
      // לא מציגים הודעת אישור למשתמש כי זה מעצבן
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // פונקציית הניקוי תרוץ כאשר הקומפוננטה נהרסת או cvId משתנה
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      saveOnUnmount()
    }
  }, [cvId]) // תלוי רק ב-cvId כדי שלא ירוץ מחדש כל הזמן

  // טעינת cvId מה-params
  useEffect(() => {
    const loadParams = async () => {
      try {
        const resolvedParams = await params
        setCvId(resolvedParams.cvId)
      } catch (err) {
        setError('שגיאה בטעינת פרמטרים')
        setIsLoading(false)
      }
    }
    loadParams()
  }, [params])

  // טעינת נתוני ה-CV
  useEffect(() => {
    if (!cvId) return

    const loadCVData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/get-cv/${encodeURIComponent(cvId)}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('קורות החיים לא נמצאו')
          }
          throw new Error('שגיאה בטעינת קורות החיים')
        }

        const data = await response.json()
        setCvData({ ...data, id: cvId })
        if (data.templateId) {
          setTemplateId(data.templateId)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה'
        setError(errorMessage)
        console.error('Error loading CV data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCVData()
  }, [cvId])

  // שמירה אוטומטית כל פעם שהנתונים משתנים
  useEffect(() => {
    if (isLoading || !cvId) return

    const autoSave = async () => {
      // בודקים אם יש כל תוכן בכלל - אפילו רק שם או שדה יחיד
      const hasAnyContent = 
        Object.values(cvData.personalInfo).some(value => value && value.trim()) ||
        cvData.experience.length > 0 ||
        cvData.education.length > 0 ||
        cvData.skills.length > 0 ||
        cvData.languages.length > 0 ||
        cvData.militaryService.length > 0 ||
        cvData.nationalService.length > 0 ||
        cvData.drivingLicenses.length > 0 ||
        cvData.customSections.length > 0

      if (hasAnyContent) {
        setIsSaving(true)
        try {
          const response = await fetch('/api/save-cv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...cvData, id: cvId }),
          })
          
          const result = await response.json()
          
          if (!response.ok) {
            console.error('שגיאה בשמירה אוטומטית:', result.error)
          }
        } catch (error) {
          console.log('שגיאה בשמירה אוטומטית:', error)
        } finally {
          setIsSaving(false)
        }
      }
    }

    // השהיה קטנה יותר - חצי שנייה כדי לתת תחושה של שמירה מיידית
    const timeoutId = setTimeout(autoSave, 500)
    return () => clearTimeout(timeoutId)
  }, [cvData, cvId, isLoading])

  const handleClearData = () => {
    if (!cvId) return
    setCvData({ ...createEmptyCV(), id: cvId })
  }

  const handleGeneratePDF = async () => {
    if (!cvId) return

    setIsGeneratingPDF(true)
    
    try {
      // תמיד נשמור לפני יצירת PDF כדי להבטיח שהנתונים מעודכנים
      console.log('📝 שומר CV לפני יצירת PDF...')
      
      const saveResponse = await fetch('/api/save-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...cvData, id: cvId }),
      })
      
      const saveResult = await saveResponse.json()
      
      if (!saveResponse.ok) {
        alert(`❌ שגיאה בשמירה: ${saveResult.error}`)
        return
      }
      
      console.log('✅ CV נשמר בהצלחה, יוצר PDF...')
      
      // יצירת PDF
      const pdfResponse = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cvId }),
      })
      
      if (!pdfResponse.ok) {
        const errorData = await pdfResponse.json()
        alert(`❌ שגיאה ביצירת PDF: ${errorData.error}`)
        return
      }
      
      const blob = await pdfResponse.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      
      // שם הקובץ מהנתונים האישיים או שם ברירת מחדל
      const fileName = cvData.personalInfo.fullName 
        ? `CV_${cvData.personalInfo.fullName.replace(/[^a-zA-Z0-9\u0590-\u05FF]/g, '_')}.pdf`
        : 'CV.pdf'
      
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      
      // ניקוי
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      console.log('✅ PDF נוצר והורד בהצלחה!')
      
    } catch (error) {
      console.error('❌ שגיאה כללית:', error)
      alert('❌ שגיאה לא צפויה בעת יצירת הPDF')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען קורות חיים...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">שגיאה בטעינה</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              חזור לדאשבורד
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              נסה שוב
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="mb-6 text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">עורך קורות חיים</h1>
          
          {/* אינדיקטור שמירה */}
          <div className="mb-4">
            {isSaving ? (
              <span className="text-yellow-600 text-sm">💾 שומר...</span>
            ) : cvId ? (
              <span className="text-green-600 text-sm">✅ נשמר אוטומטית</span>
            ) : (
              <span className="text-gray-500 text-sm">📝 התחל לכתוב לשמירה אוטומטית</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 flex-wrap">
            <button
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors text-base sm:text-lg w-full sm:w-auto"
              suppressHydrationWarning={true}
            >
              {isGeneratingPDF ? '🔄 יוצר PDF...' : '📄 הורד PDF'}
            </button>
            <button
              onClick={handleClearData}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
              suppressHydrationWarning={true}
            >
              🗑️ נקה הכל
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
              suppressHydrationWarning={true}
            >
              🏠 חזור לדאשבורד
            </button>
          </div>
        </div>

        {/* Tab buttons for mobile/tablet (< 1024px) */}
        <div className="lg:hidden mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'editor'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ✏️ מילוי פרטים
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              👁️ תצוגה מקדימה
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Editor Panel */}
          <div className={`bg-white rounded-lg shadow-md p-4 lg:p-6 lg:col-span-1 ${
            activeTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-gray-800">ערוך פרטים</h2>
            <CVEditor cvData={cvData} onUpdate={setCvData} />
          </div>

          {/* Preview Panel */}
          <div className={`bg-white rounded-lg shadow-md p-4 lg:p-6 lg:col-span-2 ${
            activeTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-gray-800">תצוגה מקדימה</h2>
            <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <CVPreview cvData={cvData} templateId={templateId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
