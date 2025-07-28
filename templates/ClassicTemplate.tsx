import { CVData } from '@/types/cv'

interface ClassicTemplateProps {
  data: CVData
}

const formatHebrewDate = (dateString: string) => {
  if (!dateString) return ''
  
  const monthsInHebrew: { [key: string]: string } = {
    '01': 'ינואר',
    '02': 'פברואר',
    '03': 'מרץ',
    '04': 'אפריל',
    '05': 'מאי',
    '06': 'יוני',
    '07': 'יולי',
    '08': 'אוגוסט',
    '09': 'ספטמבר',
    '10': 'אוקטובר',
    '11': 'נובמבר',
    '12': 'דצמבר'
  }
  
  const [year, month] = dateString.split('-')
  return `${monthsInHebrew[month]} ${year}`
}

export default function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, experience, education, skills, languages, militaryService = [], nationalService = [], drivingLicenses = [], customSections = [] } = data

  // Detect screen size for different font scaling
  const getScreenSize = () => {
    if (typeof window === 'undefined') return 'desktop'
    const width = window.innerWidth
    if (width < 640) return 'mobile'
    if (width < 768) return 'tablet'
    return 'desktop'
  }

  const screenSize = getScreenSize()

  // Font size helpers based on screen size
  const getFontSize = (mobile: string, tablet: string, desktop: string) => {
    if (screenSize === 'mobile') return mobile
    if (screenSize === 'tablet') return tablet
    return desktop
  }

  const containerStyle: React.CSSProperties = {
    fontFamily: "'Rubik', sans-serif",
    direction: 'rtl' as const,
    lineHeight: 1.5,
    color: '#333',
    width: '100%',
    maxWidth: '100%',
    margin: 0,
    padding: screenSize === 'mobile' ? '8px' : '10px',
    backgroundColor: 'white',
    minWidth: 0,
    wordWrap: 'break-word',
    boxSizing: 'border-box',
    fontSize: screenSize === 'mobile' ? '11px' : '13px'
  }

  const desktopContainerStyle: React.CSSProperties = {
    ...containerStyle,
    maxWidth: '210mm',
    margin: '0 auto',
    padding: '15mm',
    fontSize: '14px'
  }

  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    gap: screenSize === 'mobile' ? '10px' : '15px'
  }

  const desktopLayoutStyle: React.CSSProperties = {
    ...layoutStyle,
    gap: '25px'
  }

  const rightColumnStyle: React.CSSProperties = {
    width: '30%',
    minWidth: '30%',
    flexShrink: 0
  }

  const leftColumnStyle: React.CSSProperties = {
    width: '70%',
    minWidth: 0,
    flex: 1
  }

  const textBreakStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    minWidth: 0
  }

  // Detect if we're in a desktop environment (this is a simple approach for PDF generation)
  const isDesktop = screenSize === 'desktop'

  return (
    <div style={isDesktop ? desktopContainerStyle : containerStyle}>
      {/* Header */}
      <header style={{ marginBottom: '15px', textAlign: 'center', borderBottom: '2px solid #2563eb', paddingBottom: '10px' }}>
        <h1 style={{ 
          fontSize: getFontSize('16px', '20px', '22px'), 
          fontWeight: '700', 
          margin: '0', 
          color: '#3563a3ff',
          ...textBreakStyle
        }}>
          {personalInfo.fullName}
        </h1>
      </header>

      {/* Two Column Layout - responsive */}
      <div style={isDesktop ? desktopLayoutStyle : layoutStyle}>
        {/* Right Column - Personal Info, Languages, Skills, Driving Licenses */}
        <div style={rightColumnStyle}>
          {/* Personal Details */}
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: getFontSize('8px', '12px', '14px'), 
              fontWeight: '600', 
              color: '#2563eb', 
              marginBottom: '10px',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '3px'
            }}>
              פרטים אישיים
            </h2>
            <div style={{ fontSize: getFontSize('7px', '11px', '12px'), color: '#333' }}>
              {personalInfo.email && (
                <div style={{ marginBottom: '8px', ...textBreakStyle }}>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div style={{ marginBottom: '8px', ...textBreakStyle }}>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div style={{ marginBottom: '8px', ...textBreakStyle }}>
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.website && (
                <div style={{ marginBottom: '8px', ...textBreakStyle }}>
                  <span>{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedIn && (
                <div style={{ marginBottom: '8px', ...textBreakStyle }}>
                  <span>{personalInfo.linkedIn}</span>
                </div>
              )}
            </div>
          </section>

          {/* Languages */}
          {languages.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: getFontSize('8px', '12px', '14px'), 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '10px',
                borderBottom: '1px solid #e5e7eb',
                paddingBottom: '3px'
              }}>
                שפות
              </h2>
              <div style={{ display: 'grid', gap: '8px' }}>
                {languages.map((language) => (
                  <div key={language.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: getFontSize('7px', '11px', '13px'), color: '#1f2937' }}>{language.name}</span>
                    <span style={{ fontSize: getFontSize('6px', '10px', '12px'), color: '#6b7280', fontWeight: '500' }}>
                      {language.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: getFontSize('8px', '12px', '14px'), 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '10px',
                borderBottom: '1px solid #e5e7eb',
                paddingBottom: '3px'
              }}>
                מיומנויות
              </h2>
              <div style={{ display: 'grid', gap: '8px' }}>
                {skills.map((skill) => (
                  <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: getFontSize('7px', '11px', '13px'), color: '#1f2937' }}>{skill.name}</span>
                    <span style={{ fontSize: getFontSize('6px', '10px', '12px'), color: '#6b7280', fontWeight: '500' }}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Driving Licenses */}
          {drivingLicenses.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: getFontSize('8px', '12px', '14px'), 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '10px',
                borderBottom: '1px solid #e5e7eb',
                paddingBottom: '3px'
              }}>
                רישיונות נהיגה
              </h2>
              <div style={{ display: 'grid', gap: '10px' }}>
                {drivingLicenses.map((license) => {
                  // מציאת התיאור המלא מהקבועים
                  const licenseInfo = license.category ? (() => {
                    const categories = [
                      { value: 'B', label: 'B - רכב פרטי עד 3.5 טון' },
                      { value: 'C1', label: 'C1 - רכב משא עד 12 טון' },
                      { value: 'C', label: 'C - רכב משא מעל 12 טון' },
                      { value: 'C,E', label: 'C,E - גורר תומך (סמיטרלייר)' },
                      { value: 'B,D', label: 'B,D - אוטובוס + פרטי' },
                      { value: 'C1,D', label: 'C1,D - אוטובוס + משא' },
                      { value: 'D1', label: 'D1 - מונית + אוטובוס זעיר עד 5 טון' },
                      { value: 'D2', label: 'D2 - אוטובוס זעיר ציבורי עד 5 טון' },
                      { value: 'D3', label: 'D3 - אוטובוס זעיר פרטי עד 5 טון' },
                      { value: '7', label: '7 - היתר לטיולית' },
                      { value: '1', label: '1 - טרקטור' },
                      { value: 'A2', label: 'A2 - אופנוע עד 125 סמ"ק (עד 14.6 כח סוס)' },
                      { value: 'A1', label: 'A1 - אופנוע עד 33 כח סוס (עד 25 קילוואט)' },
                      { value: 'A', label: 'A - אופנוע מעל 33 כח סוס (מעל 25 קילוואט)' }
                    ];
                    return categories.find(cat => cat.value === license.category);
                  })() : null;
                  
                  return (
                    <div key={license.id} style={{ 
                      padding: '8px', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '6px',
                      backgroundColor: '#f9fafb'
                    }}>
                      <div style={{ fontSize: getFontSize('7px', '10px', '12px'), fontWeight: '600', color: '#1f2937', marginBottom: '2px' }}>
                        {licenseInfo ? licenseInfo.label : license.category}
                      </div>
                      {license.issueYear && (
                        <div style={{ fontSize: getFontSize('6px', '8px', '10px'), color: '#9ca3af' }}>
                          שנת הוצאה: {license.issueYear}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Left Column - Main Content */}
        <div style={leftColumnStyle}>
          {/* Summary */}
          {personalInfo.summary && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '12px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '4px'
              }}>
                תקציר מקצועי
              </h2>
              <p style={{ fontSize: getFontSize('10px', '11px', '12px'), lineHeight: '1.6', textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '12px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '4px'
              }}>
                ניסיון תעסוקתי
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ fontSize: getFontSize('12px', '13px', '14px'), fontWeight: '600', margin: '0', color: '#1f2937' }}>
                        {exp.jobTitle}
                      </h3>
                      <p style={{ fontSize: getFontSize('10px', '11px', '12px'), margin: '2px 0', color: '#6b7280' }}>
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <span style={{ fontSize: getFontSize('8px', '9px', '10px'), color: '#9ca3af', fontWeight: '500' }}>
                      {formatHebrewDate(exp.startDate)} - {exp.current ? 'נוכחי' : formatHebrewDate(exp.endDate)}
                    </span>
                  </div>
                  <p style={{ fontSize: getFontSize('9px', '10px', '11px'), lineHeight: '1.5', color: '#4b5563', textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '12px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '4px'
              }}>
                השכלה
              </h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: getFontSize('12px', '13px', '14px'), fontWeight: '600', margin: '0', color: '#1f2937' }}>
                        {edu.degree}
                      </h3>
                      <p style={{ fontSize: getFontSize('10px', '11px', '12px'), margin: '2px 0', color: '#6b7280' }}>
                        {edu.institution} • {edu.location}
                      </p>
                      {edu.gpa && (
                        <p style={{ fontSize: getFontSize('9px', '10px', '11px'), margin: '2px 0', color: '#6b7280' }}>
                          ציון: {edu.gpa}
                        </p>
                      )}
                      {edu.description && (
                        <p style={{ fontSize: getFontSize('9px', '10px', '11px'), margin: '4px 0 0 0', color: '#4b5563', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                          {edu.description}
                        </p>
                      )}
                    </div>
                    <span style={{ fontSize: getFontSize('8px', '9px', '10px'), color: '#9ca3af', fontWeight: '500' }}>
                      {formatHebrewDate(edu.startDate)} - {edu.current ? 'נוכחי' : formatHebrewDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Military Service */}
          {militaryService.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '12px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '4px'
              }}>
                שירות צבאי
              </h2>
              {militaryService.map((service) => (
                <div key={service.id} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ fontSize: getFontSize('12px', '13px', '14px'), fontWeight: '600', margin: '0', color: '#1f2937' }}>
                        {service.position}
                      </h3>
                      <p style={{ fontSize: getFontSize('10px', '11px', '12px'), margin: '2px 0', color: '#6b7280' }}>
                        {service.unit}{service.rank && ` • ${service.rank}`}
                      </p>
                    </div>
                    <span style={{ fontSize: getFontSize('8px', '9px', '10px'), color: '#9ca3af', fontWeight: '500' }}>
                      {formatHebrewDate(service.startDate)} - {service.current ? 'נוכחי' : formatHebrewDate(service.endDate)}
                    </span>
                  </div>
                  {service.description && (
                    <p style={{ fontSize: getFontSize('9px', '10px', '11px'), lineHeight: '1.5', color: '#4b5563', textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* National Service */}
          {nationalService.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '12px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '4px'
              }}>
                שירות לאומי
              </h2>
              {nationalService.map((service) => (
                <div key={service.id} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ fontSize: getFontSize('12px', '13px', '14px'), fontWeight: '600', margin: '0', color: '#1f2937' }}>
                        {service.position}
                      </h3>
                      <p style={{ fontSize: getFontSize('10px', '11px', '12px'), margin: '2px 0', color: '#6b7280' }}>
                        {service.organization}{service.location ? ` • ${service.location}` : ''}
                      </p>
                    </div>
                    <span style={{ fontSize: getFontSize('8px', '9px', '10px'), color: '#9ca3af', fontWeight: '500' }}>
                      {formatHebrewDate(service.startDate)} - {service.current ? 'נוכחי' : formatHebrewDate(service.endDate)}
                    </span>
                  </div>
                  {service.description && (
                    <p style={{ fontSize: getFontSize('9px', '10px', '11px'), lineHeight: '1.5', color: '#4b5563', textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Custom Sections */}
          {customSections.map((section) => (
            <section key={section.id} style={{ marginBottom: '25px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '12px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '4px'
              }}>
                {section.title}
              </h2>
              <p style={{ fontSize: getFontSize('9px', '10px', '11px'), lineHeight: '1.5', textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
