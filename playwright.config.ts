import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Tiempo máximo por test
  timeout: 30 * 1000,

  // Tiempo máximo para expect()
  expect: {
    timeout: 5000,
  },

  // Ejecutar tests en paralelo
  fullyParallel: true,

  // Evita commits con test.only
  forbidOnly: !!process.env.CI,

  // Reintentos en CI
  retries: process.env.CI ? 2 : 0,

  // Workers en CI
  workers: process.env.CI ? 1 : undefined,

  // Reporters
  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    // Base URL
    baseURL: 'https://www.saucedemo.com',

    // Evidencia
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    // Headless en CI
    headless: true,

    // Timeout navegación
    navigationTimeout: 15000,

    // Ignorar errores HTTPS
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
