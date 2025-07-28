import { NextRequest, NextResponse } from 'next/server'
import { saveCVData } from '@/lib/db'
import { CVData } from '@/types/cv'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const cvData: CVData = body.cvData || body // תמיכה בשני פורמטים
    const templateId: string = body.templateId || 'classic'
    
    console.log('💾 מבקש לשמור CV:', cvData.personalInfo)
    
    // Validate required fields - רק אם יש תוכן בפרטים האישיים
    if (cvData.personalInfo?.fullName && !cvData.personalInfo?.email) {
      return NextResponse.json(
        { error: 'אימייל נדרש כאשר יש שם מלא' },
        { status: 400 }
      )
    }
    
    if (cvData.personalInfo?.email && !cvData.personalInfo?.fullName) {
      return NextResponse.json(
        { error: 'שם מלא נדרש כאשר יש אימייל' },
        { status: 400 }
      )
    }

    const cvId = saveCVData(cvData, templateId)
    console.log('✅ CV נשמר בהצלחה עם ID:', cvId)
    
    return NextResponse.json({ cvId, message: 'קורות החיים נשמרו בהצלחה' })
  } catch (error) {
    console.error('❌ Error saving CV:', error)
    return NextResponse.json(
      { error: 'שגיאה בשמירת קורות החיים' },
      { status: 500 }
    )
  }
}
