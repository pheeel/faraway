import { ElementHandle, Page } from '@playwright/test'
import { Helpers } from 'utils'

interface ParsedData {
  collectionAddress?: string
  recipientAddress?: string
  tokenId?: string
  tokenURI?: string
  name?: string
  symbol?: string
}

const selectors = {
  eventsList: '.list-group',
  eventListItem: '.list-group-item',
}
export default class EventsList {
  private readonly page: Page
  private readonly helpers: Helpers

  constructor(page: Page) {
    this.page = page
    this.helpers = new Helpers(this.page)
  }

  async waitForNewEvent(): Promise<void> {
    const timeout = 20000
    const initialCount = await this.page
      .locator(selectors.eventListItem)
      .count()

    await this.helpers.waitForFunction(async () => {
      const newCount = await this.page.locator(selectors.eventListItem).count()
      return newCount > initialCount
    }, timeout)
  }

  async getLastEventElement(): Promise<ElementHandle | null> {
    await this.page.locator(selectors.eventsList).waitFor({ state: 'visible' })
    return this.page.locator(selectors.eventListItem).last().elementHandle()
  }

  async parseEventElement(eventElement: ElementHandle): Promise<ParsedData> {
    const eventText = await eventElement.innerText()
    console.log('Event Text: ', eventText)

    if (eventText.includes('NFT minted')) {
      return this.parseMintedNFTEvent(eventText)
    } else if (eventText.includes('Collection Created')) {
      return this.parseCollectionCreatedEvent(eventText)
    }

    return {}
  }

  private parseMintedNFTEvent(eventText: string): ParsedData {
    const collectionAddress = eventText.match(/collection: (.*?),/)?.[1]
    const recipientAddress = eventText.match(/to: (.*?),/)?.[1]
    const tokenId = eventText.match(/token id: (.*?) /)?.[1]
    const tokenURI = eventText.match(/token URI: (.*?)$/)?.[1]

    return { collectionAddress, recipientAddress, tokenId, tokenURI }
  }

  private parseCollectionCreatedEvent(eventText: string): ParsedData {
    const collectionAddress = eventText.match(/address: (.*?),/)?.[1]
    const name = eventText.match(/s*name:\s*(\w+)/)?.[1]
    const symbol = eventText.match(/symbol: (.*?)$/)?.[1]

    return { collectionAddress, name, symbol }
  }
}
