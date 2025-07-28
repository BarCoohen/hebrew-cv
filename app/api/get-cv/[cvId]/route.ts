import { NextRequest, NextResponse } from 'next/server'
import { getCVRecord } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cvId: string }> }
) {
  try {
    const { cvId } = await params
    
    if (!cvId) {
      return NextResponse.json(
        { error: 'מזהה קורות חיים נדרש' },
        { status: 400 }
      )
    }

    const cvRecord = getCVRecord(cvId)
    
    if (!cvRecord) {
      return NextResponse.json(
        { error: 'קורות חיים לא נמצאו' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...cvRecord.data,
      templateId: cvRecord.templateId
    })
  } catch (error) {
    console.error('Error fetching CV:', error)
    return NextResponse.json(
      { error: 'שגיאה בטעינת קורות החיים' },
      { status: 500 }
    )
  }
}
