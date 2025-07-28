'use client'

import { useState } from 'react'
import { CVData, PersonalInfo, Experience, Education, Skill, Language, MilitaryService, NationalService, DrivingLicense, CustomSection } from '@/types/cv'
import DateSelector from './DateSelector'
import { DRIVING_LICENSE_CATEGORIES } from '@/constants/drivingLicenses'

interface CVEditorProps {
  cvData: CVData
  onUpdate: (data: CVData) => void
}

// פונקציה ליצירת ID יציב
const generateId = () => {
  return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36)
}

export default function CVEditor({ cvData, onUpdate }: CVEditorProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'languages' | 'military' | 'national' | 'driving' | 'custom'>('personal')

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    onUpdate({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [field]: value
      }
    })
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: generateId(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    onUpdate({
      ...cvData,
      experience: [...cvData.experience, newExp]
    })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    onUpdate({
      ...cvData,
      experience: cvData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    })
  }

  const removeExperience = (id: string) => {
    onUpdate({
      ...cvData,
      experience: cvData.experience.filter(exp => exp.id !== id)
    })
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: ''
    }
    onUpdate({
      ...cvData,
      education: [...cvData.education, newEdu]
    })
  }

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    onUpdate({
      ...cvData,
      education: cvData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    })
  }

  const removeEducation = (id: string) => {
    onUpdate({
      ...cvData,
      education: cvData.education.filter(edu => edu.id !== id)
    })
  }

  const addSkill = () => {
    const newSkill: Skill = {
      id: generateId(),
      name: '',
      level: 'בינוני'
    }
    onUpdate({
      ...cvData,
      skills: [...cvData.skills, newSkill]
    })
  }

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onUpdate({
      ...cvData,
      skills: cvData.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    })
  }

  const removeSkill = (id: string) => {
    onUpdate({
      ...cvData,
      skills: cvData.skills.filter(skill => skill.id !== id)
    })
  }

  const addLanguage = () => {
    const newLang: Language = {
      id: generateId(),
      name: '',
      level: 'בינוני'
    }
    onUpdate({
      ...cvData,
      languages: [...cvData.languages, newLang]
    })
  }

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onUpdate({
      ...cvData,
      languages: cvData.languages.map(lang => 
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    })
  }

  const removeLanguage = (id: string) => {
    onUpdate({
      ...cvData,
      languages: cvData.languages.filter(lang => lang.id !== id)
    })
  }

  // Military Service functions
  const addMilitaryService = () => {
    const newService: MilitaryService = {
      id: generateId(),
      unit: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      rank: ''
    }
    onUpdate({
      ...cvData,
      militaryService: [...(cvData.militaryService || []), newService]
    })
  }

  const updateMilitaryService = (id: string, field: keyof MilitaryService, value: string | boolean) => {
    onUpdate({
      ...cvData,
      militaryService: (cvData.militaryService || []).map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    })
  }

  const removeMilitaryService = (id: string) => {
    onUpdate({
      ...cvData,
      militaryService: (cvData.militaryService || []).filter(service => service.id !== id)
    })
  }

  // Custom Sections functions
  const addCustomSection = () => {
    const newSection: CustomSection = {
      id: generateId(),
      title: '',
      content: ''
    }
    onUpdate({
      ...cvData,
      customSections: [...(cvData.customSections || []), newSection]
    })
  }

  const updateCustomSection = (id: string, field: keyof CustomSection, value: string) => {
    onUpdate({
      ...cvData,
      customSections: (cvData.customSections || []).map(section => 
        section.id === id ? { ...section, [field]: value } : section
      )
    })
  }

  const removeCustomSection = (id: string) => {
    onUpdate({
      ...cvData,
      customSections: (cvData.customSections || []).filter(section => section.id !== id)
    })
  }

  // National Service functions
  const addNationalService = () => {
    const newService: NationalService = {
      id: generateId(),
      organization: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: ''
    }
    onUpdate({
      ...cvData,
      nationalService: [...(cvData.nationalService || []), newService]
    })
  }

  const updateNationalService = (id: string, field: keyof NationalService, value: string | boolean) => {
    onUpdate({
      ...cvData,
      nationalService: (cvData.nationalService || []).map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    })
  }

  const removeNationalService = (id: string) => {
    onUpdate({
      ...cvData,
      nationalService: (cvData.nationalService || []).filter(service => service.id !== id)
    })
  }

  // Driving License functions
  const addDrivingLicense = () => {
    const newLicense: DrivingLicense = {
      id: generateId(),
      category: '',
      issueYear: ''
    }
    onUpdate({
      ...cvData,
      drivingLicenses: [...(cvData.drivingLicenses || []), newLicense]
    })
  }

  const updateDrivingLicense = (id: string, field: keyof DrivingLicense, value: string) => {
    onUpdate({
      ...cvData,
      drivingLicenses: (cvData.drivingLicenses || []).map(license => 
        license.id === id ? { ...license, [field]: value } : license
      )
    })
  }

  const removeDrivingLicense = (id: string) => {
    onUpdate({
      ...cvData,
      drivingLicenses: (cvData.drivingLicenses || []).filter(license => license.id !== id)
    })
  }

  const tabs = [
    { id: 'personal' as const, label: 'פרטים אישיים' },
    { id: 'experience' as const, label: 'ניסיון תעסוקתי' },
    { id: 'education' as const, label: 'השכלה' },
    { id: 'skills' as const, label: 'מיומנויות' },
    { id: 'languages' as const, label: 'שפות' },
    { id: 'military' as const, label: 'שירות צבאי' },
    { id: 'national' as const, label: 'שירות לאומי' },
    { id: 'driving' as const, label: 'רישיונות נהיגה' },
    { id: 'custom' as const, label: 'התאמה אישית' },
  ]

  const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab)
  const canGoPrevious = currentTabIndex > 0
  const canGoNext = currentTabIndex < tabs.length - 1

  const handlePrevious = () => {
    if (canGoPrevious) {
      setActiveTab(tabs[currentTabIndex - 1].id)
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      setActiveTab(tabs[currentTabIndex + 1].id)
    }
  }

  return (
    <div className="w-full" suppressHydrationWarning>
      {/* הודעת עזרה למשתמשים חדשים */}
      {cvData.personalInfo.fullName === '' && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-blue-500 ml-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h4 className="text-blue-800 font-medium">ברוכים הבאים לעורך קורות החיים!</h4>
              <p className="text-blue-700 text-sm mt-1">
                התחילו במילוי הפרטים האישיים בלשונית הראשונה. התצוגה המקדימה תתעדכן אוטומטית.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            suppressHydrationWarning
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">שם מלא</label>
              <input
                type="text"
                value={cvData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                suppressHydrationWarning
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
              <input
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                suppressHydrationWarning
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">טלפון</label>
              <input
                type="tel"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">כתובת</label>
              <input
                type="text"
                value={cvData.personalInfo.address}
                onChange={(e) => updatePersonalInfo('address', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">לינקדאין (אופציונלי)</label>
              <input
                type="text"
                value={cvData.personalInfo.linkedIn || ''}
                onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">אתר אישי (אופציונלי)</label>
              <input
                type="text"
                value={cvData.personalInfo.website || ''}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">תקציר מקצועי</label>
              <textarea
                value={cvData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="כתבו כאן תקציר קצר על הרקע המקצועי שלכם..."
              />
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            {cvData.experience.map((exp, index) => (
              <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-medium">ניסיון תעסוקתי #{index + 1}</h4>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    הסר
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">תפקיד</label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">חברה</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">מיקום</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <DateSelector
                    value={exp.startDate}
                    onChange={(value) => updateExperience(exp.id, 'startDate', value)}
                    label="תאריך התחלה"
                  />
                  <div>
                    <label className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">תפקיד נוכחי</span>
                    </label>
                  </div>
                  {!exp.current && (
                    <DateSelector
                      value={exp.endDate}
                      onChange={(value) => updateExperience(exp.id, 'endDate', value)}
                      label="תאריך סיום"
                    />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">תיאור התפקיד</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="תארו את האחריות העיקריות וההישגים בתפקיד..."
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + הוסף ניסיון תעסוקתי
            </button>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            {cvData.education.map((edu, index) => (
              <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-medium">השכלה #{index + 1}</h4>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    הסר
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">תואר/קורס</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">מוסד לימודים</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">מיקום</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ציון ממוצע (אופציונלי)</label>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">תיאור (אופציונלי)</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="תיאור השכלה, התמחויות, פרויקטים או הישגים רלוונטיים..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <DateSelector
                    value={edu.startDate}
                    onChange={(value) => updateEducation(edu.id, 'startDate', value)}
                    label="תאריך התחלה"
                  />
                  <div>
                    <label className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={edu.current}
                        onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">לימודים נוכחיים</span>
                    </label>
                  </div>
                  {!edu.current && (
                    <DateSelector
                      value={edu.endDate}
                      onChange={(value) => updateEducation(edu.id, 'endDate', value)}
                      label="תאריך סיום"
                    />
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + הוסף השכלה
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            {cvData.skills.map((skill, index) => (
              <div key={skill.id} className="flex items-center space-x-4 space-x-reverse border border-gray-200 rounded-lg p-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="שם הכישור"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value as any)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="מתחיל">מתחיל</option>
                    <option value="בינוני">בינוני</option>
                    <option value="מתקדם">מתקדם</option>
                    <option value="מומחה">מומחה</option>
                  </select>
                </div>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1"
                >
                  הסר
                </button>
              </div>
            ))}
            <button
              onClick={addSkill}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + הוסף כישור
            </button>
          </div>
        )}

        {activeTab === 'languages' && (
          <div className="space-y-4">
            {cvData.languages.map((language, index) => (
              <div key={language.id} className="flex items-center space-x-4 space-x-reverse border border-gray-200 rounded-lg p-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={language.name}
                    onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="שם השפה"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={language.level}
                    onChange={(e) => updateLanguage(language.id, 'level', e.target.value as any)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="בסיסי">בסיסי</option>
                    <option value="בינוני">בינוני</option>
                    <option value="מתקדם">מתקדם</option>
                    <option value="שפת אם">שפת אם</option>
                    <option value="דו לשוני">דו לשוני</option>
                  </select>
                </div>
                <button
                  onClick={() => removeLanguage(language.id)}
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1"
                >
                  הסר
                </button>
              </div>
            ))}
            <button
              onClick={addLanguage}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + הוסף שפה
            </button>
          </div>
        )}

        {/* Military Service Tab */}
        {activeTab === 'military' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">שירות צבאי</h3>
            {(cvData.militaryService || []).map((service) => (
              <div key={service.id} className="border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      יחידה
                    </label>
                    <input
                      type="text"
                      value={service.unit}
                      onChange={(e) => updateMilitaryService(service.id, 'unit', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="למשל: יחידת 8200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      תפקיד
                    </label>
                    <input
                      type="text"
                      value={service.position}
                      onChange={(e) => updateMilitaryService(service.id, 'position', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="למשל: מנתח מערכות"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      דרגה
                    </label>
                    <input
                      type="text"
                      value={service.rank || ''}
                      onChange={(e) => updateMilitaryService(service.id, 'rank', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="למשל: סמל ראשון"
                    />
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <input
                      type="checkbox"
                      id={`current-military-${service.id}`}
                      checked={service.current}
                      onChange={(e) => updateMilitaryService(service.id, 'current', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`current-military-${service.id}`} className="text-sm text-gray-700">
                      עדיין בשירות
                    </label>
                  </div>
                  <DateSelector
                    value={service.startDate}
                    onChange={(value) => updateMilitaryService(service.id, 'startDate', value)}
                    label="תאריך התחלה"
                  />
                  {!service.current && (
                    <DateSelector
                      value={service.endDate}
                      onChange={(value) => updateMilitaryService(service.id, 'endDate', value)}
                      label="תאריך סיום"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    תיאור
                  </label>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateMilitaryService(service.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="תאר את התפקיד, האחריות והישגים בשירות הצבאי..."
                  />
                </div>
                <button
                  onClick={() => removeMilitaryService(service.id)}
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1"
                >
                  הסר שירות צבאי
                </button>
              </div>
            ))}
            <button
              onClick={addMilitaryService}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + הוסף שירות צבאי
            </button>
          </div>
        )}

        {/* National Service Tab */}
        {activeTab === 'national' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">שירות לאומי</h3>
            {(cvData.nationalService || []).map((service) => (
              <div key={service.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ארגון
                    </label>
                    <input
                      type="text"
                      value={service.organization}
                      onChange={(e) => updateNationalService(service.id, 'organization', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="למשל: עמותת נתן"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      תפקיד
                    </label>
                    <input
                      type="text"
                      value={service.position}
                      onChange={(e) => updateNationalService(service.id, 'position', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="למשל: מדריך נוער"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      מיקום
                    </label>
                    <input
                      type="text"
                      value={service.location || ''}
                      onChange={(e) => updateNationalService(service.id, 'location', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="למשל: תל אביב"
                    />
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <input
                      type="checkbox"
                      id={`current-national-${service.id}`}
                      checked={service.current}
                      onChange={(e) => updateNationalService(service.id, 'current', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`current-national-${service.id}`} className="text-sm text-gray-700">
                      עדיין בשירות
                    </label>
                  </div>
                  <DateSelector
                    value={service.startDate}
                    onChange={(value) => updateNationalService(service.id, 'startDate', value)}
                    label="תאריך התחלה"
                  />
                  {!service.current && (
                    <DateSelector
                      value={service.endDate}
                      onChange={(value) => updateNationalService(service.id, 'endDate', value)}
                      label="תאריך סיום"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    תיאור
                  </label>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateNationalService(service.id, 'description', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="תאר את תפקידך ואת הפעילויות שביצעת..."
                  />
                </div>
                <button
                  onClick={() => removeNationalService(service.id)}
                  className="mt-4 text-red-600 hover:text-red-800 text-sm"
                >
                  הסר שירות לאומי
                </button>
              </div>
            ))}
            <button
              onClick={addNationalService}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + הוסף שירות לאומי
            </button>
          </div>
        )}

        {/* Driving Licenses Tab */}
        {activeTab === 'driving' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">רישיונות נהיגה</h3>
            {(cvData.drivingLicenses || []).map((license) => (
              <div key={license.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      סוג רישיון
                    </label>
                    <select
                      value={license.category}
                      onChange={(e) => updateDrivingLicense(license.id, 'category', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">בחר סוג רישיון</option>
                      {DRIVING_LICENSE_CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      שנת הוצאה
                    </label>
                    <input
                      type="text"
                      value={license.issueYear}
                      onChange={(e) => updateDrivingLicense(license.id, 'issueYear', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="לדוגמה: 2020"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeDrivingLicense(license.id)}
                  className="mt-4 text-red-600 hover:text-red-800 text-sm"
                >
                  הסר רישיון
                </button>
              </div>
            ))}
            <button
              onClick={addDrivingLicense}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + הוסף רישיון נהיגה
            </button>
          </div>
        )}

        {/* Custom Sections Tab */}
        {activeTab === 'custom' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">התאמה אישית</h3>
            {(cvData.customSections || []).map((section) => (
              <div key={section.id} className="border rounded-lg p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    כותרת הסעיף
                  </label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="למשל: פרויקטים אישיים, פרסומים, הישגים..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    תוכן
                  </label>
                  <textarea
                    value={section.content}
                    onChange={(e) => updateCustomSection(section.id, 'content', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="כתוב כאן את התוכן של הסעיף..."
                  />
                </div>
                <button
                  onClick={() => removeCustomSection(section.id)}
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1"
                >
                  הסר סעיף
                </button>
              </div>
            ))}
            <button
              onClick={addCustomSection}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + הוסף סעיף מותאם
            </button>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            canGoPrevious
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          הקודם
        </button>
        
        <div className="text-center text-sm text-gray-500 self-center">
          {currentTabIndex + 1} מתוך {tabs.length} - {tabs[currentTabIndex].label}
        </div>
        
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            canGoNext
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          הבא
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
