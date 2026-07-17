export const FACILITY_OPTIONS = [
  { value: 'gym_ac', label: 'Fitness Gym (AC)' },
  { value: 'gym_nonac', label: 'Fitness Gym (Non-AC)' },
  { value: 'gym_monthly', label: 'Fitness Gym (Monthly)' },
  { value: 'total_membership', label: 'Total Membership' },
  { value: 'turf_weekday', label: 'Football Turf (Weekday)' },
  { value: 'turf_weekend', label: 'Football Turf (Weekend)' },
  { value: 'badminton_1', label: 'Badminton Court 1' },
  { value: 'badminton_2', label: 'Badminton Court 2' },
  { value: 'badminton_3', label: 'Badminton Court 3' },
];

export const FACILITY_GROUP_OPTIONS = [
  { value: 'gym', label: 'Gym', color: 'amber' },
  { value: 'turf', label: 'Football Turf', color: 'emerald' },
  { value: 'badminton', label: 'Badminton', color: 'blue' },
];

export const PAYMENT_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', tone: 'warning' },
  { value: 'paid', label: 'Paid', tone: 'success' },
  { value: 'failed', label: 'Failed', tone: 'danger' },
  { value: 'refunded', label: 'Refunded', tone: 'info' },
];

export const BOOKING_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', tone: 'warning' },
  { value: 'confirmed', label: 'Confirmed', tone: 'info' },
  { value: 'completed', label: 'Completed', tone: 'success' },
  { value: 'cancelled', label: 'Cancelled', tone: 'danger' },
];

export const MEMBERSHIP_STATUS_OPTIONS = [
  { value: 'active', label: 'Active', tone: 'success' },
  { value: 'expiring', label: 'Expiring Soon', tone: 'warning' },
  { value: 'expired', label: 'Expired', tone: 'danger' },
  { value: 'cancelled', label: 'Cancelled', tone: 'default' },
];

export const MEMBERSHIP_TYPE_OPTIONS = [
  { value: 'gym_ac', label: 'Gym AC' },
  { value: 'gym_nonac', label: 'Gym Non-AC' },
  { value: 'gym_monthly', label: 'Gym Monthly' },
  { value: 'total_membership', label: 'Total Membership (All Access)' },
];

export const PAYMENT_METHOD_OPTIONS = [
  { value: 'cash', label: 'Cash' },
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Card' },
  { value: 'netbanking', label: 'Net Banking' },
];

export const DAY_TYPE_OPTIONS = [
  { value: 'all', label: 'Every Day' },
  { value: 'weekday', label: 'Weekdays' },
  { value: 'weekend', label: 'Weekends' },
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
  { value: 'sun', label: 'Sunday' },
];
