import { NextResponse } from 'next/server';
import { getAllCVs } from '@/lib/db';

export async function GET() {
  try {
    const allCVs = getAllCVs();
    
    // המר את הנתונים לפורמט נוח יותר לקליינט
    const cvList = Object.entries(allCVs).map(([cvId, record]) => ({
      cvId,
      title: record.data.personalInfo?.fullName || 'קורות חיים ללא שם',
      templateId: record.templateId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      personalInfo: {
        fullName: record.data.personalInfo?.fullName || '',
        email: record.data.personalInfo?.email || ''
      }
    }));

    // מיין לפי תאריך עדכון (החדשים ביותר בהתחלה)
    cvList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json({ cvs: cvList });
  } catch (error) {
    console.error('❌ Error fetching all CVs:', error);
    return NextResponse.json(
      { error: 'שגיאה בטעינת רשימת קורות החיים' },
      { status: 500 }
    );
  }
}
