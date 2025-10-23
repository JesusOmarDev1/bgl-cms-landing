'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const EmailNotificationsRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    emailTo?: string
    subject?: string
  }>()

  const emailTo = data?.data?.emailTo
  const subject = data?.data?.subject
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let displayText = 'Notificación Email'

  if (subject && emailTo) {
    const truncatedSubject = subject.length > 20 ? `${subject.substring(0, 20)}...` : subject
    const truncatedEmail = emailTo.length > 20 ? `${emailTo.substring(0, 20)}...` : emailTo
    displayText = `${truncatedSubject} → ${truncatedEmail}`
  } else if (subject) {
    displayText = subject.length > 35 ? `${subject.substring(0, 35)}...` : subject
  } else if (emailTo) {
    displayText = emailTo.length > 35 ? `${emailTo.substring(0, 35)}...` : emailTo
  }

  return (
    <div>
      {rowNum}
      {displayText}
    </div>
  )
}
