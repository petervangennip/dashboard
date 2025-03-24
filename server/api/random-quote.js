export default defineEventHandler(async () => {
  const apiUrl = 'https://zenquotes.io/api/random';

  try {
    const response = await $fetch(apiUrl);
    return response[0]; // Return the first quote from the response
  } catch (error) {
    console.error('Error fetching quote:', error);
    return { quote: 'Failed to load quote.', author: '' };
  }
});
