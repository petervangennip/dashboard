export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event); // Get private config on the server
  const calendarId = 'c_ffb03ed80e220b82c128b6672fa15cb9e8ea043508ac1cfde0ba9e3cb8bbde5d@group.calendar.google.com';

  const apiKey = config.googleApiKey; // Private key (never exposed)

  try {
    const response = await $fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`,
    );

    return response; // Forward the response to the frontend
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch events' });
  }
});
