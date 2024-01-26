import { useEffect, useState } from 'react';
import { getEvents } from './service/api';
import { PaginatedEventsData, PaginationType, UserEvent } from './types/events.ts';
import Event from './components/Event.tsx';
import Pagination from './components/Pagination.tsx';
import { ToastContainer } from 'react-toastify';
import "../src/App.css"

function App() {
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (i?: number) => {
    try {
      const eventsData: PaginatedEventsData | undefined = await getEvents({page: i});
      if (eventsData) {
        setPagination(eventsData.pagination)
        setEvents(eventsData.data)
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return(
      <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 border-t-blue-500 border-l-4 border-l-transparent h-12 w-12"></div>
      </div>
    )
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="relative min-h-screen">
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-x-2'>
          {events.map(event => (
            <Event fetchEvent={fetchData} key={`evt_${event.id}`} event={event} />
          ))}
        </div>
      <div className="absolute -bottom-10  left-0 right-0 mt-12 mb-5">
        <Pagination pagination={pagination} onPageChange={(i: number) => fetchData(i)} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;


