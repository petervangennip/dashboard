import { format, parseISO } from 'date-fns';
import { enUS, nl } from 'date-fns/locale';
/**
 * Formats a given ISO date string into a specified format.
 *
 * @param {string} isoDate - The ISO 8601 date string to be formatted.
 * @param {string} [formatString='dd-MM-yyyy HH:mm:ss'] - The format string to be applied to the date.
 * @param {string} [locale='nl'] - The locale to be used for formatting. Defaults to 'nl'.
 * @returns {string} The formatted date string.
 */
export const formatIsoDate = (isoDate, formatString = 'dd-MM-yyyy HH:mm:ss', locale = 'nl') => {
  return format(parseISO(isoDate), formatString, { locale: locale === 'nl' ? nl : enUS });
};
