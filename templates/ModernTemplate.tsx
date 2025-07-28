import { CVData } from '@/types/cv'

interface ModernTemplateProps {
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

export default function ModernTemplate({ data }: ModernTemplateProps) {
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
    color: '#1a202c',
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

  const textBreakStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    minWidth: 0
  }

  // Detect if we're in a desktop environment (this is a simple approach for PDF generation)
  const isDesktop = screenSize === 'desktop'

  return (
    <div style={isDesktop ? desktopContainerStyle : containerStyle}>
      {/* Header Section - Full Width */}
      <header style={{ 
        marginBottom: '25px', 
        padding: '20px', 
        backgroundColor: '#2d3748', 
        borderRadius: '12px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #38b2ac, #4fd1c7)',
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
          opacity: 0.3
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: getFontSize('16px', '20px', '22px'), 
            fontWeight: '700', 
            margin: '0 0 10px 0', 
            color: '#ffffff',
            ...textBreakStyle
          }}>
            {personalInfo.fullName}
          </h1>
          
          {/* Contact Information in Header */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '15px', 
            fontSize: getFontSize('7px', '11px', '12px'),
            color: '#e2e8f0'
          }}>
            {personalInfo.email && (
              <span style={textBreakStyle}>{personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span style={textBreakStyle}>{personalInfo.phone}</span>
            )}
            {personalInfo.address && (
              <span style={textBreakStyle}>{personalInfo.address}</span>
            )}
            {personalInfo.website && (
              <span style={textBreakStyle}>{personalInfo.website}</span>
            )}
            {personalInfo.linkedIn && (
              <span style={textBreakStyle}>{personalInfo.linkedIn}</span>
            )}
          </div>
        </div>
      </header>

      {/* Summary Section */}
      {personalInfo.summary && (
        <section style={{ 
          marginBottom: '25px',
          padding: '20px',
          backgroundColor: '#f7fafc',
          borderRadius: '8px',
          borderRight: '4px solid #38b2ac'
        }}>
          <h2 style={{ 
            fontSize: getFontSize('16px', '17px', '18px'), 
            fontWeight: '600', 
            color: '#2d3748', 
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#38b2ac',
              borderRadius: '50%'
            }} />
            תקציר מקצועי
          </h2>
          <p style={{ 
            fontSize: getFontSize('10px', '11px', '12px'), 
            lineHeight: '1.6', 
            textAlign: 'justify', 
            whiteSpace: 'pre-wrap',
            color: '#4a5568',
            margin: 0
          }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Two Column Layout */}
      <div style={{ 
        display: 'flex', 
        gap: screenSize === 'mobile' ? '15px' : '25px',
        flexDirection: screenSize === 'mobile' ? 'column' : 'row'
      }}>
        {/* Left Column - Main Content */}
        <div style={{ 
          width: screenSize === 'mobile' ? '100%' : '65%',
          minWidth: 0,
          flex: 1
        }}>
          {/* Experience */}
          {experience.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2d3748', 
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: 'linear-gradient(135deg, #38b2ac, #4fd1c7)',
                  borderRadius: '3px'
                }} />
                ניסיון תעסוקתי
              </h2>
              {experience.map((exp, index) => (
                <div key={exp.id} style={{ 
                  marginBottom: '25px',
                  padding: '18px',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  position: 'relative'
                }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    right: '-6px',
                    top: '20px',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#38b2ac',
                    borderRadius: '50%',
                    border: '3px solid white'
                  }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ 
                        fontSize: getFontSize('12px', '13px', '14px'), 
                        fontWeight: '600', 
                        margin: '0', 
                        color: '#2d3748' 
                      }}>
                        {exp.jobTitle}
                      </h3>
                      <p style={{ 
                        fontSize: getFontSize('10px', '11px', '12px'), 
                        margin: '4px 0', 
                        color: '#38b2ac',
                        fontWeight: '500'
                      }}>
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <span style={{ 
                      fontSize: getFontSize('8px', '9px', '10px'), 
                      color: '#718096', 
                      fontWeight: '500',
                      backgroundColor: '#edf2f7',
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
                      {formatHebrewDate(exp.startDate)} - {exp.current ? 'נוכחי' : formatHebrewDate(exp.endDate)}
                    </span>
                  </div>
                  <p style={{ 
                    fontSize: getFontSize('9px', '10px', '11px'), 
                    lineHeight: '1.5', 
                    color: '#4a5568', 
                    textAlign: 'justify', 
                    whiteSpace: 'pre-wrap',
                    margin: 0
                  }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2d3748', 
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: 'linear-gradient(135deg, #38b2ac, #4fd1c7)',
                  borderRadius: '3px'
                }} />
                השכלה
              </h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ 
                  marginBottom: '20px',
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ 
                        fontSize: getFontSize('12px', '13px', '14px'), 
                        fontWeight: '600', 
                        margin: '0', 
                        color: '#2d3748' 
                      }}>
                        {edu.degree}
                      </h3>
                      <p style={{ 
                        fontSize: getFontSize('10px', '11px', '12px'), 
                        margin: '4px 0', 
                        color: '#38b2ac',
                        fontWeight: '500'
                      }}>
                        {edu.institution} • {edu.location}
                      </p>
                      {edu.gpa && (
                        <p style={{ 
                          fontSize: getFontSize('9px', '10px', '11px'), 
                          margin: '2px 0', 
                          color: '#718096' 
                        }}>
                          ציון: {edu.gpa}
                        </p>
                      )}
                      {edu.description && (
                        <p style={{ 
                          fontSize: getFontSize('9px', '10px', '11px'), 
                          margin: '6px 0 0 0', 
                          color: '#4a5568',
                          lineHeight: '1.4',
                          whiteSpace: 'pre-wrap'
                        }}>
                          {edu.description}
                        </p>
                      )}
                    </div>
                    <span style={{ 
                      fontSize: getFontSize('8px', '9px', '10px'), 
                      color: '#718096', 
                      fontWeight: '500',
                      backgroundColor: '#edf2f7',
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
                      {formatHebrewDate(edu.startDate)} - {edu.current ? 'נוכחי' : formatHebrewDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Military Service */}
          {militaryService.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2d3748', 
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: 'linear-gradient(135deg, #38b2ac, #4fd1c7)',
                  borderRadius: '3px'
                }} />
                שירות צבאי
              </h2>
              {militaryService.map((service) => (
                <div key={service.id} style={{ 
                  marginBottom: '20px',
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ 
                        fontSize: getFontSize('12px', '13px', '14px'), 
                        fontWeight: '600', 
                        margin: '0', 
                        color: '#2d3748' 
                      }}>
                        {service.position}
                      </h3>
                      <p style={{ 
                        fontSize: getFontSize('10px', '11px', '12px'), 
                        margin: '4px 0', 
                        color: '#38b2ac',
                        fontWeight: '500'
                      }}>
                        {service.unit}{service.rank && ` • ${service.rank}`}
                      </p>
                    </div>
                    <span style={{ 
                      fontSize: getFontSize('8px', '9px', '10px'), 
                      color: '#718096', 
                      fontWeight: '500',
                      backgroundColor: '#edf2f7',
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
                      {formatHebrewDate(service.startDate)} - {service.current ? 'נוכחי' : formatHebrewDate(service.endDate)}
                    </span>
                  </div>
                  {service.description && (
                    <p style={{ 
                      fontSize: getFontSize('9px', '10px', '11px'), 
                      lineHeight: '1.5', 
                      color: '#4a5568', 
                      textAlign: 'justify', 
                      whiteSpace: 'pre-wrap',
                      margin: 0
                    }}>
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* National Service */}
          {nationalService.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2d3748', 
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: 'linear-gradient(135deg, #38b2ac, #4fd1c7)',
                  borderRadius: '3px'
                }} />
                שירות לאומי
              </h2>
              {nationalService.map((service) => (
                <div key={service.id} style={{ 
                  marginBottom: '20px',
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ 
                        fontSize: getFontSize('12px', '13px', '14px'), 
                        fontWeight: '600', 
                        margin: '0', 
                        color: '#2d3748' 
                      }}>
                        {service.position}
                      </h3>
                      <p style={{ 
                        fontSize: getFontSize('10px', '11px', '12px'), 
                        margin: '4px 0', 
                        color: '#38b2ac',
                        fontWeight: '500'
                      }}>
                        {service.organization}{service.location ? ` • ${service.location}` : ''}
                      </p>
                    </div>
                    <span style={{ 
                      fontSize: getFontSize('8px', '9px', '10px'), 
                      color: '#718096', 
                      fontWeight: '500',
                      backgroundColor: '#edf2f7',
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
                      {formatHebrewDate(service.startDate)} - {service.current ? 'נוכחי' : formatHebrewDate(service.endDate)}
                    </span>
                  </div>
                  {service.description && (
                    <p style={{ 
                      fontSize: getFontSize('9px', '10px', '11px'), 
                      lineHeight: '1.5', 
                      color: '#4a5568', 
                      textAlign: 'justify', 
                      whiteSpace: 'pre-wrap',
                      margin: 0
                    }}>
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Custom Sections */}
          {customSections.map((section) => (
            <section key={section.id} style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: getFontSize('16px', '17px', '18px'), 
                fontWeight: '600', 
                color: '#2d3748', 
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: 'linear-gradient(135deg, #38b2ac, #4fd1c7)',
                  borderRadius: '3px'
                }} />
                {section.title}
              </h2>
              <div style={{ 
                padding: '16px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <p style={{ 
                  fontSize: getFontSize('9px', '10px', '11px'), 
                  lineHeight: '1.5', 
                  textAlign: 'justify', 
                  whiteSpace: 'pre-wrap',
                  color: '#4a5568',
                  margin: 0
                }}>
                  {section.content}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Right Column - Sidebar */}
        <div style={{ 
          width: screenSize === 'mobile' ? '100%' : '35%',
          minWidth: screenSize === 'mobile' ? 0 : '250px',
          flexShrink: 0
        }}>
          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ 
              marginBottom: '25px',
              padding: '20px',
              backgroundColor: '#2d3748',
              borderRadius: '12px',
              color: 'white'
            }}>
              <h2 style={{ 
                fontSize: getFontSize('14px', '15px', '16px'), 
                fontWeight: '600', 
                color: '#ffffff', 
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#38b2ac',
                  borderRadius: '50%'
                }} />
                מיומנויות
              </h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {skills.map((skill) => (
                  <div key={skill.id} style={{ 
                    padding: '8px 12px',
                    backgroundColor: 'rgba(56, 178, 172, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(56, 178, 172, 0.3)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: getFontSize('7px', '11px', '13px'), 
                        color: '#e2e8f0',
                        fontWeight: '500'
                      }}>
                        {skill.name}
                      </span>
                      <span style={{ 
                        fontSize: getFontSize('6px', '10px', '12px'), 
                        color: '#38b2ac', 
                        fontWeight: '600',
                        backgroundColor: 'rgba(56, 178, 172, 0.2)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section style={{ 
              marginBottom: '25px',
              padding: '20px',
              backgroundColor: '#f7fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h2 style={{ 
                fontSize: getFontSize('14px', '15px', '16px'), 
                fontWeight: '600', 
                color: '#2d3748', 
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#38b2ac',
                  borderRadius: '50%'
                }} />
                שפות
              </h2>
              <div style={{ display: 'grid', gap: '10px' }}>
                {languages.map((language) => (
                  <div key={language.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      fontSize: getFontSize('7px', '11px', '13px'), 
                      color: '#2d3748',
                      fontWeight: '500'
                    }}>
                      {language.name}
                    </span>
                    <span style={{ 
                      fontSize: getFontSize('6px', '10px', '12px'), 
                      color: '#38b2ac', 
                      fontWeight: '600',
                      backgroundColor: '#e6fffa',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      {language.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Driving Licenses */}
          {drivingLicenses.length > 0 && (
            <section style={{ 
              marginBottom: '25px',
              padding: '20px',
              backgroundColor: '#f7fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h2 style={{ 
                fontSize: getFontSize('14px', '15px', '16px'), 
                fontWeight: '600', 
                color: '#2d3748', 
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#38b2ac',
                  borderRadius: '50%'
                }} />
                רישיונות נהיגה
              </h2>
              <div style={{ display: 'grid', gap: '12px' }}>
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
                      padding: '10px', 
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0', 
                      borderRadius: '8px'
                    }}>
                      <div style={{ 
                        fontSize: getFontSize('7px', '10px', '12px'), 
                        fontWeight: '600', 
                        color: '#2d3748', 
                        marginBottom: '4px' 
                      }}>
                        {licenseInfo ? licenseInfo.label : license.category}
                      </div>
                      {license.issueYear && (
                        <div style={{ 
                          fontSize: getFontSize('6px', '8px', '10px'), 
                          color: '#718096' 
                        }}>
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
      </div>
    </div>
  )
}
