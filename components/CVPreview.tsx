import { CVData } from '@/types/cv'
import TemplateRenderer from '@/templates/TemplateRenderer'

interface CVPreviewProps {
  cvData: CVData
  templateId?: string
}

export default function CVPreview({ cvData, templateId = 'classic' }: CVPreviewProps) {
  // בדיקה אם הנתונים ריקים
  const isEmpty = !cvData.personalInfo?.fullName && 
                  !cvData.personalInfo?.email && 
                  (cvData.experience || []).length === 0 && 
                  (cvData.education || []).length === 0 && 
                  (cvData.skills || []).length === 0 && 
                  (cvData.languages || []).length === 0 &&
                  (cvData.militaryService || []).length === 0 &&
                  (cvData.nationalService || []).length === 0 &&
                  (cvData.drivingLicenses || []).length === 0 &&
                  (cvData.customSections || []).length === 0

  if (isEmpty) {
    return (
      <div className="w-full bg-gray-50 min-h-[800px] border border-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            התצוגה המקדימה תופיע כאן
          </h3>
          <p className="text-gray-500 mb-4">
            התחילו למלא את הפרטים בצד שמאל כדי לראות את קורות החיים שלכם
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full bg-white min-h-[400px] sm:min-h-[600px] lg:min-h-[800px] overflow-auto border border-gray-200 rounded-lg">
      <div className="w-full transform scale-100 sm:scale-90 lg:scale-95 xl:scale-100 origin-top" style={{ transformOrigin: 'top center' }}>
        <TemplateRenderer templateId={templateId} data={cvData} />
      </div>
    </div>
  )
}
