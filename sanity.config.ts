import { createConfig, Slug } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import api from 'schemas/api'
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
  schema: { types: [post, author, api] },
  document: {
    productionUrl: async (prev, { client, document }) => {
      // @TODO grab secret with client
      const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
      if (!secret) {
        console.warn('No preview secret set. Previews disabled.')
        return prev
      }
      const url = new URL('/api/preview', location.origin)
      url.searchParams.set('secret', secret)

      try {
        switch (document._type) {
          case post.name:
            url.searchParams.set('slug', (document.slug as Slug).current!)
            break
          default:
            return prev
        }
        return url.toString()
      } catch {
        return prev
      }
    },
  },
})
