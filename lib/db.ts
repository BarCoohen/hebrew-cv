import { CVData } from '@/types/cv';

// מבנה נתונים מורחב לרשומת CV
export interface CVRecord {
  data: CVData;
  templateId: string;
  createdAt: string;
  updatedAt: string;
}

// מסד נתונים זמני בזיכרון
const tempCVStorage: { [cvId: string]: CVRecord } = {};

export function saveCVData(cvData: CVData, templateId: string = 'classic'): string {
  const cvId = cvData.id || generateCVId();
  const timestamp = new Date().toISOString();
  
  const existingRecord = tempCVStorage[cvId];
  
  tempCVStorage[cvId] = {
    data: {
      ...cvData,
      id: cvId,
      updatedAt: timestamp,
      createdAt: existingRecord?.data.createdAt || timestamp
    },
    templateId: existingRecord?.templateId || templateId,
    createdAt: existingRecord?.createdAt || timestamp,
    updatedAt: timestamp
  };
  
  return cvId;
}

export function getCVData(cvId: string): CVData | null {
  const record = tempCVStorage[cvId];
  return record ? record.data : null;
}

export function getAllCVs(): { [cvId: string]: CVRecord } {
  return tempCVStorage;
}

export function getCVRecord(cvId: string): CVRecord | null {
  return tempCVStorage[cvId] || null;
}

export function deleteCVData(cvId: string): boolean {
  if (tempCVStorage[cvId]) {
    delete tempCVStorage[cvId];
    return true;
  }
  return false;
}

function generateCVId(): string {
  return 'cv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
