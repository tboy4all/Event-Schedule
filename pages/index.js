import React from 'react'
// import { getFeaturedEvents } from '@/dummy-data'
import EventList from '@/components/events/event-list'
import { getFeaturedEvents } from '@/helpers/api-utils'

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents()
  return (
    <div>
      <EventList items={props.events} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  }
}

export default HomePage
