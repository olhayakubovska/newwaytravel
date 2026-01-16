import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'
import AllToursClient from './AllToursClient'
import { Config, Page } from '@/payload-types'

interface Props {
  params: Promise<{ locale: Config['locale'] }>
}

export default async function ToursPage({ params }: Props) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const pageResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'tours' } },
    limit: 1,
    depth: 3,
    locale: locale,
  })

  const page = pageResult.docs[0] as Page | undefined
  if (!page) return notFound()

  const searchBarBlockData = page.layout?.find((block) => block.blockType === 'searchBar') as
    | Extract<NonNullable<Page['layout']>[number], { blockType: 'searchBar' }>
    | undefined

  const otherBlocks = page.layout?.filter((block) => block.blockType !== 'searchBar')

  const toursData = await payload.find({
    collection: 'tours',
    limit: 100,
    locale: locale,
  })

  const tours = toursData.docs

  return (
    <>
      <RenderBlocks blocks={otherBlocks || []} />

      <AllToursClient initialTours={tours} searchBarData={searchBarBlockData} />
    </>
  )
}
