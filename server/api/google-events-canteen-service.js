export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event); // Get private config on the server
  const calendarId = 'c_eb8b2f6b7fb5c3c80534e3e5c962af4b2e0400d99d26414c4a522681625860ab@group.calendar.google.com';

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
