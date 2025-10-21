type TimerResult = {
  sec: () => number;
  min: () => number;
  hour: () => number;
  monthly: () => number;
};
/**
 * A utility for creating readable time-based values in milliseconds.
 * @param value The numerical value of the time unit.
 * @example
 * timer(15).sec()  // Returns 15000
 * timer(30).min()  // Returns 1800000
 */
export function timer(value: number): TimerResult {
  return {
    /** Converts the value to seconds in milliseconds. */
    sec: () => value * 1000,
    /** Converts the value to minutes in milliseconds. */
    min: () => value * 60 * 1000,
    /** Converts the value to hours in milliseconds. */
    hour: () => value * 60 * 60 * 1000,
    /** * Converts the value to months in milliseconds.
     * Note: For simplicity, a month is treated as a fixed 30 days.
     */
    monthly: () => value * 30 * 24 * 60 * 60 * 1000,
  };
}
