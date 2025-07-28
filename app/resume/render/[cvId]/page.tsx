// app/resume/render/[cvId]/page.tsx
import { getCVRecord } from '@/lib/db';
import TemplateRenderer from '@/templates/TemplateRenderer';

// מאלץ רינדור דינמי ומונע Caching
export const dynamic = 'force-dynamic';

export default async function ResumeRenderPage({ params }: { params: Promise<{ cvId: string }> }) {
  const resolvedParams = await params;
  const cvId = decodeURIComponent(resolvedParams.cvId);
  const cvRecord = getCVRecord(cvId);

  if (!cvRecord) {
    return <div>CV Not Found</div>;
  }

  return <TemplateRenderer templateId={cvRecord.templateId} data={cvRecord.data} />;
}
