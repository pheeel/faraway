import { defineConfig, devices } from '@playwright/test'
import { config } from 'dotenv'

config()
const maxWorkers = process.env.MAX_WORKERS
const retries = process.env.RETRIES
const viewport = {
  width: 1366,
  height: 768,
}

export default defineConfig({
  workers: Number(maxWorkers),
  retries: Number(retries),
  timeout: 1000 * 80,
  reporter: [['list'], ['html', { open: 'never' }]],
  testDir: 'src/tests',
  testMatch: ['**/src/tests/**/**.spec.ts'],
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:3000',
    actionTimeout: 1000 * 10,
    browserName: 'chromium',
    headless: false,
    locale: 'en-GB',
    ignoreHTTPSErrors: false,
    launchOptions: {
      slowMo: 250,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport,
      },
    },
  ],
  outputDir: 'test-results',
})
