import { createConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import author from 'schemas/author'
import post from 'schemas/post'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const basePath = '/studio'

export default createConfig({
  projectId,
  dataset,
  basePath,
  name: 'blog',
  title: 'Blog',
  plugins: [deskTool(), unsplashImageAsset()],
  schema: { types: [author, post] },
  document: {
    productionUrl: async (prev, { client, document }) => {
      const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
      debugger
      // @TODO grab secret with client
      switch (document._type) {
        case post.name:
          return `https://blog.${process.env.NEXT_PUBLIC_DOMAIN}/${document.slug}`
        default:
          return prev
      }
    },
  },
})
