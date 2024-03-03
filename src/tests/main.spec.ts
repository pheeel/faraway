import test, { expect } from 'fixtures'
import { DEPLOY_COLLECTION_TEST_DATA, MINT_NFT_TEST_DATA } from 'consts'

test.describe.serial('App', () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(3000)
  })

  test('Deploy Collection', async ({
    page,
    metamask,
    deployCollectionForm,
    eventsList,
  }) => {
    await metamask.acceptAccess()
    await page.reload()
    await deployCollectionForm.fill(
      DEPLOY_COLLECTION_TEST_DATA.COLLECTION_NAME,
      DEPLOY_COLLECTION_TEST_DATA.COLLECTION_SYMBOL,
      DEPLOY_COLLECTION_TEST_DATA.TOKEN_URI
    )
    await deployCollectionForm.clickCreateButton()
    await metamask.confirmTransaction()
    await eventsList.waitForNewEvent()

    const lastEventElement = await eventsList.getLastEventElement()
    const parsedDeployedCollectionData = await eventsList.parseEventElement(
      lastEventElement!
    )
    MINT_NFT_TEST_DATA.COLLECTION_ADDRESS =
      parsedDeployedCollectionData.collectionAddress!

    expect(parsedDeployedCollectionData).toEqual({
      collectionAddress: expect.any(String),
      name: DEPLOY_COLLECTION_TEST_DATA.COLLECTION_NAME,
      symbol: DEPLOY_COLLECTION_TEST_DATA.COLLECTION_SYMBOL,
    })
  })

  test('Mint NFT', async ({ mintNftForm, metamask, eventsList, page }) => {
    await metamask.acceptAccess()
    await page.reload()
    await mintNftForm.fill(
      MINT_NFT_TEST_DATA.COLLECTION_ADDRESS,
      MINT_NFT_TEST_DATA.RECIPIENT_ADDRESS,
      MINT_NFT_TEST_DATA.TOKEN_ID
    )
    await mintNftForm.clickMintButton()
    await metamask.confirmTransaction()
    await eventsList.waitForNewEvent()

    const lastEventElement = await eventsList.getLastEventElement()
    const parsedEventData = await eventsList.parseEventElement(
      lastEventElement!
    )

    expect(parsedEventData).toEqual({
      collectionAddress: MINT_NFT_TEST_DATA.COLLECTION_ADDRESS,
      recipientAddress: MINT_NFT_TEST_DATA.RECIPIENT_ADDRESS,
      tokenId: MINT_NFT_TEST_DATA.TOKEN_ID,
      tokenURI: `collection_uri${MINT_NFT_TEST_DATA.TOKEN_ID}`,
    })
  })
})
