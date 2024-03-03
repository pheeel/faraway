import { Page } from '@playwright/test'

const selectors = {
  inputs: {
    collectionAddress: 'input[placeholder="Enter collection address"]',
    recipientAddress: 'input[placeholder="Enter recipient address"]',
    tokenId: 'input[placeholder="Enter token id"]',
  },
  mintButton: 'text="Mint"',
}
export default class MintNftForm {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async fill(
    collectionAddress: string,
    recipientAddress: string,
    tokenId: string
  ): Promise<void> {
    await this.page.fill(selectors.inputs.collectionAddress, collectionAddress)
    await this.page.fill(selectors.inputs.recipientAddress, recipientAddress)
    await this.page.fill(selectors.inputs.tokenId, tokenId.toString())
  }

  async clickMintButton(): Promise<void> {
    await this.page.click(selectors.mintButton)
  }
}
