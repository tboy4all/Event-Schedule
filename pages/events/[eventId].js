// import { useRouter } from 'next/router'

// import { getEventById } from '@/dummy-data'
import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event.summary'
import ErrorAlert from '@/components/ui/error-alert'
import { getEventById, getFeaturedEvents } from '@/helpers/api-utils'
import Head from 'next/head'

const EventDetailPage = (props) => {
  // const router = useRouter()

  // const { eventId } = router.query
  // const event = getEventById(eventId)

  const event = props.selectedEvent

  if (!event) {
    return (
      // <ErrorAlert>
      //   <p>No event found!</p>
      // </ErrorAlert>
      <div className='center'>
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta
          name={event.description}
          content='Fimd a lot of great events that allows you to evolve...'
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId

  const event = await getEventById(eventId)

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()

  const paths = events.map((event) => ({ params: { eventId: event.id } }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export default EventDetailPage
