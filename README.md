<h1 align="center">Welcome to Svelte Watch API 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-13.x-blue.svg" />
  <a href="https://twitter.com/arnazeh" target="_blank">
    <img alt="Twitter: arnazeh" src="https://img.shields.io/twitter/follow/arnazeh.svg?style=social" />
  </a>
</p>

> API for svelte-watch libraries stats with NodeJs

### 🏠 [Homepage](https://svelte-watch-api.herokuapp.com/)

### ✨ [Demo](https://svelte-watch.web.app/)

API back-end for the Svelte-watch project that returns statistics for svelte libraries after fetching data from Github and NPM APIs.

## Install

```sh
yarn
```

## Usage

```sh
yarn start
```

Visit http://localhost:3000/ it should return JSON response with the following shape:

```json
{
  updatedAt: string,
  data: Array<
   {
      name: string;
      url: string;
      tags: string[];
      description: string;
      starsCount: number;
      contributorsCount: number;
      recentCommitsCount: number;
      recentDownloadsCount: number;
      hasMeaningfulTests: false;
      hasExampleCode: false;
      hasAPIDoc: false;
      hasCISetup: false;
      hasTopRecentDownloads: boolean;
      hasTopStars: boolean;
      hasRecentRelease: boolean;
      hasMultipleContributers: boolean;
      hasManyContributers: boolean;
      hasRecentCommits: boolean;
      score: number;
    }
  >
  ]
}
```

## Author

👤 **Nazeh**

- Website: Nazeh.me
- Twitter: [@arnazeh](https://twitter.com/arnazeh)
- Github: [@nazeh](https://github.com/nazeh)
- LinkedIn: [@arnazeh](https://linkedin.com/in/arnazeh)

## Show your support

Give a ⭐️ if this project helped you!
