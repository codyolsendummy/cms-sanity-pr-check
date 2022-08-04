import { createConfig, Slug } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import apiType from 'schemas/api'
import authorType from 'schemas/author'
import postType from 'schemas/post'

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
  schema: { types: [postType, authorType, apiType] },
  document: {
    actions: (prev, { schemaType }) => {
      switch (schemaType) {
        case apiType.name:
          // Remove buttons that don't make sense for the Manage API screen since it is a singleton with liveEdit
          return []

        default:
          return prev
      }
    },
    newDocumentOptions: (prev, { creationContext }) => {
      // Hide "API" from the global "New document..." menu
      switch (creationContext.type) {
        case 'global':
          return prev.filter(
            (templateItem) => templateItem.templateId !== apiType.name
          )
        default:
          return prev
      }
    },
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
          case postType.name:
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
