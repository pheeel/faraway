[![CI](https://github.com/pheeel/faraway/actions/workflows/ci.yml/badge.svg)](https://github.com/pheeel/faraway/actions/workflows/ci.yml)
[![Tests](https://github.com/pheeel/faraway/actions/workflows/test.yml/badge.svg)](https://github.com/pheeel/faraway/actions/workflows/test.yml)

# Faraway Tech Task
This repository contains testing framework based on [Playwright](https://playwright.dev/), [Typescript](https://www.typescriptlang.org/) and [Synpress](https://github.com/Synthetixio/synpress) using Playwright Test as a test runner. <br /><br />
Features:

- Configurable amount of retries and max workers via `.env` file
- Basic ESLint and Prettier configuration
- CI setup for tests
- Static code analysis on CI with TypeScript Compiler and ESLint
- HTML report generation

## Local Setup
First you'll need to install dependencies:
```sh
$ npm install
```

> NOTE: If you don't have the correct version of Chromium installed, you can run the following command to install it:
> ```sh
> $ npx playwright install chromium 
> ```

Now, we can optionally set up the environment variables. You can find `.env` file in the root directory of the project and change the following variables depending on your needs::
```
# Number of workers to run tests in parallel, default: 1
MAX_WORKERS=1 

# Number of retries for each test, default: 0
RETRIES=0 
```
Then we need to build our backend and frontend images, for that follow the steps below: <br />
1. Build the frontend and backend images:
```sh
$ docker pull evercoinx/faraway:nft-collection-deployer-frontend
$ docker pull evercoinx/faraway:nft-collection-deployer-backend
````

2. Get corresponding image IDs
```sh
$ docker images
````

3. Run containers
```sh
$ docker run -p 4000:4000 <Backend Image ID>   
$ docker run -p 3000:3000 <Frontend Image ID>
```

## Running tests
To run the tests in the `chromium` project:
```sh
$ npm run test
```

## Generating Report
To generate and open HTML report of the last tests run:
```sh
$ npx playwright show-report
```

## Static Code Analysis
You can also check static code analysis issues with the following commands:
```sh
$ npm run lint:fix # Check and fix ESLint issues
$ npm run prettier # Format code with Prettier
$ npm run tsc # Check TypeScript compilation issues
```

## CI Run
Open [GitHub Action](https://github.com/pheeel/faraway/actions/workflows/test.yml) and trigger the job manually.

## Additional Notes
> Tests may fail due to non-isolated environment - the smart contract can be triggered by other users causing new event to appear in the app. 

> Tests may fail due to insufficient MATIC tokens in the test account. You can top up the account balance by using the faucet: https://www.alchemy.com/faucets/polygon-mumbai <br />
> The test account address is: `0x5dF162C376950311F2EE4241180611c81c30F517`
