'use client'

interface DateSelectorProps {
  value: string // Format: "YYYY-MM"
  onChange: (value: string) => void
  label: string
}

export default function DateSelector({ value, onChange, label }: DateSelectorProps) {
  const months = [
    { value: '01', label: 'ינואר' },
    { value: '02', label: 'פברואר' },
    { value: '03', label: 'מרץ' },
    { value: '04', label: 'אפריל' },
    { value: '05', label: 'מאי' },
    { value: '06', label: 'יוני' },
    { value: '07', label: 'יולי' },
    { value: '08', label: 'אוגוסט' },
    { value: '09', label: 'ספטמבר' },
    { value: '10', label: 'אוקטובר' },
    { value: '11', label: 'נובמבר' },
    { value: '12', label: 'דצמבר' }
  ]

  const [year, month] = value ? value.split('-') : ['', '']

  const handleYearChange = (newYear: string) => {
    if (newYear) {
      const newValue = month ? `${newYear}-${month}` : `${newYear}-01`
      onChange(newValue)
    } else if (month) {
      onChange(`2024-${month}`) // Default year if only month is selected
    } else {
      onChange('')
    }
  }

  const handleMonthChange = (newMonth: string) => {
    if (newMonth) {
      const newValue = year ? `${year}-${newMonth}` : `2024-${newMonth}`
      onChange(newValue)
    } else if (year) {
      onChange(`${year}-01`) // Default month if only year is selected
    } else {
      onChange('')
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <select
          value={month}
          onChange={(e) => handleMonthChange(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">בחר חודש</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          onChange={(e) => handleYearChange(e.target.value)}
          placeholder="שנה"
          min="1950"
          max="2050"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  )
}
