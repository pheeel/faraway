import { Page } from '@playwright/test'

const selectors = {
  inputs: {
    collectionName: 'input[placeholder="Enter collection name"]',
    collectionSymbol: 'input[placeholder="Enter collection symbol"]',
    tokenUri: 'input[placeholder="Enter collection token URI"]',
  },
  createButton: 'text="Create"',
}
export default class DeployCollectionForm {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async fill(
    collectionName: string,
    collectionSymbol: string,
    tokenUri: string
  ): Promise<void> {
    await this.page.fill(selectors.inputs.collectionName, collectionName)
    await this.page.fill(selectors.inputs.collectionSymbol, collectionSymbol)
    await this.page.fill(selectors.inputs.tokenUri, tokenUri)
  }

  async clickCreateButton(): Promise<void> {
    await this.page.click(selectors.createButton)
  }
}
