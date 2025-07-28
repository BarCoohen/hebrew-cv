import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { cvId } = await request.json();
    if (!cvId) {
      return NextResponse.json({ error: 'מזהה קורות חיים נדרש' }, { status: 400 });
    }

    // 1. קבל את ה-HTML המוכן מהעמוד החדש שיצרנו
    console.log(`Fetching HTML from render page for CV ID: ${cvId}`);
    const baseUrl = process.env.NEXTAUTH_URL || 'https://hebrew-cv-elgb.vercel.app/';
    const renderUrl = `${baseUrl}/resume/render/${encodeURIComponent(cvId)}`;
    console.log(`🔗 Full render URL: ${renderUrl}`);
    
    const response = await fetch(renderUrl, {
      cache: 'no-store',
      headers: {
        // !!! --- הוסף את השורה הזאת --- !!!
        'X-Render-For-PDF': 'true'
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch rendered HTML from ${renderUrl}. Status: ${response.status}`, errorText);
      throw new Error(`Failed to fetch rendered HTML from ${renderUrl}`);
    }
    const htmlContent = await response.text();
    console.log('HTML content fetched successfully. Length:', htmlContent.length);

    // 2. שלח את ה-HTML הזה ל-PDFShift (הקוד הזה נשאר אותו דבר)
    const pdfShiftApiKey = process.env.PDFSHIFT_API_KEY;
    if (!pdfShiftApiKey) {
      console.error('PDFShift API key is not configured.');
      return NextResponse.json({ error: 'API key חסר' }, { status: 500 });
    }

    // לוגים לבדיקת המפתח
    console.log('🔑 PDFShift API Key loaded:', !!pdfShiftApiKey);
    console.log('🔑 API Key starts with:', pdfShiftApiKey.substring(0, 10) + '...');
    console.log('🔑 API Key length:', pdfShiftApiKey.length);

    const pdfResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'X-API-Key': pdfShiftApiKey, // פורמט המקורי של PDFShift
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        source: htmlContent, // ה-HTML השלם מהעמוד שרינדרנו
        sandbox: true,
        format: 'A4'
      })
    });

    if (!pdfResponse.ok) {
        const errorText = await pdfResponse.text();
        console.error('PDFShift Error:', errorText);
        return NextResponse.json({ error: 'PDFShift API error', details: errorText }, { status: pdfResponse.status });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="cv_${cvId}.pdf"`
      }
    });

  } catch (error) {
    console.error('General error in generate-pdf:', error);
    return NextResponse.json({ error: 'שגיאה כללית ביצירת PDF', details: (error as Error).message }, { status: 500 });
  }
}
