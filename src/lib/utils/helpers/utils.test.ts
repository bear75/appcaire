import { AppConfig } from '../config/app-config';
import { getI18nPath } from './utils';

describe('Helpers', () => {
  describe('getI18nPath function', () => {
    it('should not change the path for default language', () => {
      const url = '/random-url';
      const locale = AppConfig.defaultLocale;

      expect(getI18nPath(url, locale)).toBe(url);
    });

    it('should prepend the locale to the path for non-default language', () => {
      const url = '/random-url';
      const locale = 'en';

      expect(getI18nPath(url, locale)).toMatch(/^\/en/);
    });
  });
}); 