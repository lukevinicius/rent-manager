import dayjs from 'dayjs'

export function FormatPeriodToDate(period: string): Date {
  let date: Date

  switch (period) {
    case 'today':
      date = dayjs().startOf('day').toDate()
      break
    case 'yesterday':
      date = dayjs().subtract(1, 'day').toDate()
      break
    case 'last-7-days':
      date = dayjs().subtract(7, 'day').toDate()
      break
    case 'last-15-days':
      date = dayjs().subtract(15, 'day').toDate()
      break
    case 'last-30-days':
      date = dayjs().subtract(30, 'day').toDate()
      break
    case 'this-month':
      date = dayjs().startOf('month').toDate()
      break
    case 'last-month':
      date = dayjs().subtract(1, 'month').startOf('month').toDate()
      break
    case 'last-3-months':
      date = dayjs().subtract(3, 'month').startOf('month').toDate()
      break
    // default:
    //   throw new AppError('Invalid period')
    default:
      throw new Error('Invalid period')
  }

  return date
}
