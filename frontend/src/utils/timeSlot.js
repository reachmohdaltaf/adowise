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

  // Get day name from selected date
  const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  
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
  const timeSlots = [];
  const selectedDateString = selectedDate.toISOString().split('T')[0];
  
  dayConfig.timeSlots.forEach(timeSlot => {
    if (timeSlot.isAvailable) {
      // Parse time slots (assuming they're in HH:MM format)
      const [fromHour, fromMinute] = timeSlot.from.split(':').map(Number);
      const [toHour, toMinute] = timeSlot.to.split(':').map(Number);
      
      // Handle same time (might be a single slot)
      if (fromHour === toHour && fromMinute === toMinute) {
        const timeString = formatTime(fromHour, fromMinute);
        timeSlots.push({
          date: selectedDateString,
          slot: `${timeString} - ${formatTime(fromHour + 1, fromMinute)}`, // Assuming 1-hour slots
          startTime: timeSlot.from,
          endTime: formatTime24(fromHour + 1, fromMinute)
        });
      } else {
        // Generate slots for the time range (assuming 1-hour intervals)
        let currentHour = fromHour;
        let currentMinute = fromMinute;
        
        while (currentHour < toHour || (currentHour === toHour && currentMinute < toMinute)) {
          const startTime = formatTime(currentHour, currentMinute);
          const nextHour = currentMinute + 60 >= 60 ? currentHour + 1 : currentHour;
          const nextMinute = (currentMinute + 60) % 60;
          const endTime = formatTime(nextHour, nextMinute);
          
          timeSlots.push({
            date: selectedDateString,
            slot: `${startTime} - ${endTime}`,
            startTime: formatTime24(currentHour, currentMinute),
            endTime: formatTime24(nextHour, nextMinute)
          });
          
          currentHour = nextHour;
          currentMinute = nextMinute;
          
          // Prevent infinite loop
          if (currentHour > 23) break;
        }
      }
    }
  });

  return timeSlots;
};

/**
 * Checks if a specific date has available time slots
 * @param {Date} date - Date to check availability for
 * @param {Object} calendar - Calendar object containing schedules and block dates
 * @returns {boolean} True if date has available time slots
 */
export const isDateAvailable = (date, calendar) => {
  if (!calendar) return false;

  const activeSchedule = getActiveSchedule(calendar);
  if (!activeSchedule) return false;

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const dayConfig = activeSchedule.availableDays.find(day => day.day === dayName);
  
  // Check if day has available time slots
  const hasAvailableSlots = dayConfig && 
    dayConfig.timeSlots && 
    dayConfig.timeSlots.some(slot => slot.isAvailable);

  // Check if date is not blocked
  const isBlocked = isDateBlocked(date, calendar, activeSchedule);

  return hasAvailableSlots && !isBlocked;
};

/**
 * Gets all available dates within a date range
 * @param {Date} startDate - Start date of the range
 * @param {Date} endDate - End date of the range
 * @param {Object} calendar - Calendar object
 * @returns {Array} Array of available dates
 */
export const getAvailableDatesInRange = (startDate, endDate, calendar) => {
  const availableDates = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    if (isDateAvailable(currentDate, calendar)) {
      availableDates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return availableDates;
};

/**
 * Gets the next available date from a given start date
 * @param {Date} startDate - Starting date to search from
 * @param {Object} calendar - Calendar object
 * @param {number} maxDays - Maximum days to search (default: 30)
 * @returns {Date|null} Next available date or null if none found
 */
export const getNextAvailableDate = (startDate, calendar, maxDays = 30) => {
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < maxDays; i++) {
    if (isDateAvailable(currentDate, calendar)) {
      return new Date(currentDate);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return null;
};