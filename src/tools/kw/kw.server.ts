export function secondsToFormattedMinutes(seconds: number): string {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  // Pad the minutes and seconds with leading zeros if needed
  let formattedMinutes = String(minutes).padStart(2, '0');
  let formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
