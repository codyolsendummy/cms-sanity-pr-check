import { createConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import schemaTypes from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default createConfig({
  name: 'blog',
  title: 'Blog',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: { types: schemaTypes },
})
