import EventList from '@/components/events/event-list'
import EventsSearch from '@/components/events/events-search'
import { getAllEvents } from '@/helpers/api-utils'
// import { getAllEvents } from '@/dummy-data'
import { useRouter } from 'next/router'
import React from 'react'

const AllEventsPage = (props) => {
  const router = useRouter()
  // const events = getAllEvents()
  const { events } = props

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`

    router.push(fullPath)
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents()

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  }
}

export default AllEventsPage
