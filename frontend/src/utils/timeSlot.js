/**
 * Time Slot Utilities
 * Collection of utility functions for handling calendar time slots and availability
 */

/**
 * Formats time to 12-hour format with AM/PM
 * @param {number} hour - Hour in 24-hour format (0-23)
 * @param {number} minute - Minutes (0-59)
 * @returns {string} Formatted time string (e.g., "2:30 PM")
 */
export const formatTime = (hour, minute) => {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  const displayMinute = minute.toString().padStart(2, '0');
  return `${displayHour}:${displayMinute} ${ampm}`;
};

/**
 * Formats time to 24-hour format
 * @param {number} hour - Hour (0-23)
 * @param {number} minute - Minutes (0-59)
 * @returns {string} Formatted time string (e.g., "14:30")
 */
export const formatTime24 = (hour, minute) => {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

/**
 * Checks if a schedule has any available time slots
 * @param {Object} schedule - Schedule object with availableDays array
 * @returns {boolean} True if schedule has any available time slots
 */
export const hasAnyTimeSlots = (schedule) => {
  if (!schedule || !schedule.availableDays) return false;
  
  return schedule.availableDays.some(day => 
    day.timeSlots && 
    day.timeSlots.length > 0 && 
    day.timeSlots.some(slot => slot.isAvailable)
  );
};

/**
 * Finds the active schedule or falls back to first schedule with time slots
 * @param {Object} calendar - Calendar object with schedules array and activeSchedule
 * @returns {Object|null} Active schedule or null if none found
 */
export const getActiveSchedule = (calendar) => {
  if (!calendar || !calendar.schedules || calendar.schedules.length === 0) {
    return null;
  }

  // Find active schedule
  let activeSchedule = calendar.schedules.find(
    schedule => schedule.scheduleTitle === calendar.activeSchedule
  );

  // If active schedule has no time slots, find the first schedule with time slots
  if (!activeSchedule || !hasAnyTimeSlots(activeSchedule)) {
    activeSchedule = calendar.schedules.find(schedule => hasAnyTimeSlots(schedule));
  }

  return activeSchedule;
};

/**
 * Checks if a specific date is blocked globally or in the schedule
 * @param {Date} date - Date to check
 * @param {Object} calendar - Calendar object with blockDates
 * @param {Object} schedule - Schedule object with blockDates
 * @returns {boolean} True if date is blocked
 */
export const isDateBlocked = (date, calendar, schedule) => {
  const dateString = date.toISOString().split('T')[0];
  
  // Check global block dates
  const isBlockedGlobally = calendar.blockDates?.some(blockedDate => 
    new Date(blockedDate).toISOString().split('T')[0] === dateString
  );
  
  // Check schedule-specific block dates
  const isBlockedInSchedule = schedule?.blockDates?.some(blockedDate => 
    new Date(blockedDate).toISOString().split('T')[0] === dateString
  );

  return isBlockedGlobally || isBlockedInSchedule;
};

/**
 * Generates time slots for a specific date based on calendar data
 * @param {Object} calendar - Calendar object containing schedules and block dates
 * @param {Date} selectedDate - Date to generate time slots for
 * @returns {Array} Array of time slot objects
 */
export const generateTimeSlots = (calendar, selectedDate) => {
  if (!calendar || !selectedDate) return [];

  const activeSchedule = getActiveSchedule(calendar);
  if (!activeSchedule) return [];

  // Get day name from selected date (e.g., "monday")
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[selectedDate.getDay()];
  
  // Find the day configuration
  const dayConfig = activeSchedule.availableDays.find(day => day.day === dayName);
  
  if (!dayConfig || !dayConfig.timeSlots || dayConfig.timeSlots.length === 0) {
    return [];
  }

  // Check if the selected date is blocked
  if (isDateBlocked(selectedDate, calendar, activeSchedule)) {
    return [];
  }

  // Generate time slots for available time ranges
  return dayConfig.timeSlots
    .filter(timeSlot => timeSlot.isAvailable)
    .map(timeSlot => ({
      slot: `${timeSlot.from} - ${timeSlot.to}`,
      startTime: timeSlot.from,
      endTime: timeSlot.to
    }));
};

/**
 * Checks if a specific date has available time slots
 * @param {Date} date - Date to check availability for
 * @param {Object} calendar - Calendar object containing schedules and block dates
 * @returns {boolean} True if date has available time slots
 */
export const isDateAvailable = (date, calendar) => {
  if (!calendar) return false;
  
  // Check if date is in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return false;
  
  const activeSchedule = getActiveSchedule(calendar);
  if (!activeSchedule) return false;

  // Check if date is blocked
  if (isDateBlocked(date, calendar, activeSchedule)) {
    return false;
  }

  // Check if day has available time slots
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[date.getDay()];
  const dayConfig = activeSchedule.availableDays.find(day => day.day === dayName);
  
  return dayConfig && 
         dayConfig.timeSlots && 
         dayConfig.timeSlots.some(slot => slot.isAvailable);
};