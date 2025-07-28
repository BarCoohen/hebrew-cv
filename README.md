# אפליקציית יצירת קורות חיים בעברית

אפליקציה מתקדמת ליצירת קורות חיים מקצועיים בעברית עם תמיכה מלאה ב-RTL ויצירת קבצי PDF איכותיים.

## תכונות עיקריות

- **עיצוב מותאם לעברית**: תמיכה מלאה ב-RTL עם פונט Rubik
- **ממשק משתמש נוח**: עורך אינטואיטיבי עם תצוגה מקדימה חיה
- **יצירת PDF**: הורדת קורות חיים כקובץ PDF מקצועי באמצעות PDFShift
- **תבניות מקצועיות**: תבנית ClassicTemplate מעוצבת במיוחד לשוק הישראלי
- **אחסון זמני**: מסד נתונים בזיכרון לאחסון זמני של הנתונים

## טכנולוגיות

- **Framework**: Next.js 14+ עם App Router
- **שפה**: TypeScript
- **עיצוב**: Tailwind CSS
- **יצירת PDF**: PDFShift API
- **פונט**: Rubik מ-Google Fonts

## התקנה והפעלה

1. התקנת תלות:
\`\`\`bash
npm install
\`\`\`

2. הגדרת משתני סביבה (אופציונלי):
\`\`\`bash
# צרו קובץ .env.local והוסיפו:
PDFSHIFT_API_KEY=your_pdfshift_api_key
\`\`\`

3. הפעלת שרת הפיתוח:
\`\`\`bash
npm run dev
\`\`\`

4. פתחו את הדפדפן בכתובת: http://localhost:3000

## מבנה הפרויקט

\`\`\`
├── app/
│   ├── page.tsx                 # עמוד הנחיתה
│   ├── editor/page.tsx          # עמוד העורך
│   ├── layout.tsx               # Layout עם הגדרות RTL
│   ├── globals.css              # עיצוב גלובלי
│   └── api/
│       ├── save-cv/route.ts     # API לשמירת קורות חיים
│       ├── get-cv/[cvId]/route.ts  # API לטעינת קורות חיים
│       └── generate-pdf/route.ts   # API ליצירת PDF
├── components/
│   ├── CVEditor.tsx             # קומפוננטת העורך
│   └── CVPreview.tsx            # תצוגה מקדימה
├── templates/
│   └── ClassicTemplate.tsx      # תבנית עיצוב קורות החיים
├── lib/
│   └── db.ts                    # מסד נתונים זמני
├── types/
│   └── cv.ts                    # הגדרות טיפוסים
└── .github/
    └── copilot-instructions.md  # הוראות לקופיילוט
\`\`\`

## API Endpoints

### POST /api/save-cv
שמירת נתוני קורות חיים ויצירת מזהה ייחודי.

### GET /api/get-cv/[cvId]
טעינת נתוני קורות חיים לפי מזהה.

### POST /api/generate-pdf
יצירת קובץ PDF מנתוני קורות חיים קיימים.

## הגדרת PDFShift (אופציונלי)

ליצירת קבצי PDF איכותיים, יש צורך ב-API key של PDFShift:

1. הירשמו ל-PDFShift: https://pdfshift.io
2. קבלו API key
3. הוסיפו למשתני הסביבה:
\`\`\`
PDFSHIFT_API_KEY=your_api_key_here
\`\`\`

**הערה**: ללא API key, המערכת תחזיר קובץ HTML במקום PDF.

## פיתוח

- הפרויקט משתמש ב-TypeScript עם strict mode
- כל הקומפוננטות תומכות ב-RTL
- השתמשו ב-Tailwind classes לעיצוב
- הקפידו על תמיכה מלאה בעברית

## רישיון

MIT License
