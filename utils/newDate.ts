import spacetime from 'spacetime'
import { ZURICH_TIMEZONE } from '@/config/timezone'

export const createDateWithZurichTimezone = () =>
  spacetime.now(ZURICH_TIMEZONE).toNativeDate()
