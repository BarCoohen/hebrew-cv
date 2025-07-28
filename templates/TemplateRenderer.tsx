import { CVData } from '@/types/cv';
import ClassicTemplate from '@/templates/ClassicTemplate';
import ModernTemplate from '@/templates/ModernTemplate';

interface TemplateRendererProps {
  templateId: string;
  data: CVData;
}

export default function TemplateRenderer({ templateId, data }: TemplateRendererProps) {
  switch (templateId) {
    case 'classic':
      return <ClassicTemplate data={data} />;

    case 'modern':
      return <ModernTemplate data={data} />;

    default:
      return <ClassicTemplate data={data} />;
  }
}
