import Link from 'next/link'
import { SanityMonogram } from '@sanity/logos'

export default function NoStories() {
  return (
    <div className="max-w-md mx-auto text-lg border rounded bg-accent-1 border-accent-2">
      <Link href="/studio">
        <a className="flex items-center p-6 font-semibold underline transition-colors duration-200 gap-x-4 hover:text-success">
          <SanityMonogram className="text-3xl" />
          Create and publish content for your blog
        </a>
      </Link>
    </div>
  )
}
