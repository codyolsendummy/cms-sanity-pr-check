import { defineType } from 'sanity'

export default defineType({
  name: 'api',
  title: 'API',
  type: 'document',
  liveEdit: true,
  fieldsets: [
    {
      name: 'secrets',
      title: 'Secrets',
      description: 'Used to secure API endpoints',
    },
  ],
  fields: [
    {
      name: 'PREVIEW_SECRET',
      title: '/api/preview',
      type: 'string',
      fieldset: 'secrets',
    },
    {
      name: 'cors',
      type: 'string',
    },
  ],
})
