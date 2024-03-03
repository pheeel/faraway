import { Page } from '@playwright/test'
export default class Helpers {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async waitForFunction(
    func: () => any,
    timeout = 10000,
    timeInterval = 500
  ): Promise<boolean> {
    const maxIterations = timeout / timeInterval
    for (let i = 0; i < maxIterations; i += 1) {
      const result = await func()
      await this.sleep(timeInterval)
      if (result) return true
    }
    return false
  }

  async sleep(timeout: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, timeout))
  }
}
