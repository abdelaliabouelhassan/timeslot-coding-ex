export type CalendarDayAvailability =
  | 'AVAILABLE_APPOINTMENTS'
  | 'LAST_APPOINTMENT_AVAILABLE'
  | 'ZERO_APPOINTMENTS_AVAILABLE'

export type WeekCalendarDay = {
  key: string
  date: Date
  availabilityState: CalendarDayAvailability
  isSelected: boolean
}
