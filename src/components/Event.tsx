import { UserEvent } from '../types/events.ts';
import SimpleModal from './Modal.tsx';
import { useState } from 'react';
import Review from './Review.tsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getEventById } from '../service/api.ts';

interface EventProps {
  event: UserEvent;
  fetchEvent?: () => Promise<void>;
}

const Event: React.FC<EventProps> = ({ event, fetchEvent }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const formatDate = (dateString: string) => {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Lütfen bir puanlama yapınız.');
      return;
    } else {

      try {
        // nested post request is now allowed by json-server
        //await axios.post(`http://localhost:3000/events/${event.id}/reviews`, newReview);
        const response = await getEventById(event.id)
        const currentEvent: any = response
        const newReview = { rating, comment };
        const updatedReviews = [...currentEvent.reviews, newReview];
        await axios.put(`http://localhost:3000/events/${event.id}`, { ...currentEvent, reviews: updatedReviews });

        if (fetchEvent)
          await fetchEvent()
        
          toast.success('Yorumunuz başarıyla kaydedildi.');
        setRating(0)
        setComment("")
      } catch (error) {
        toast.error('Yorum kaydedilirken bir hata oluştu.');
      }

    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div onClick={openModal} className="bg-gray-700 relative cursor-pointer max-w-[500px] w-full mx-auto mt-6 mb-6 p-6 rounded-xl shadow-md flex flex-col items-center space-y-2 min-h-40">
        <div className="h-[50%] flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="text-white-500">{event.description}</p>
          <div className="flex justify-between w-full">
            <p className="text-custom-text-color">{formatDate(event.date)}</p>
            <p className="text-custom-text-color">{event.location}</p>
          </div>
        </div>
        <div className="w-full">
          <img alt='event_image' className='object-fill h-[150px] w-full' src={event.imageUrl} />
        </div>
      </div>
      <SimpleModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col">
          <div className="h-[50%] flex flex-col justify-center gap-4">
            <h2 className="text-2xl font-semibold">{event.name}</h2>
            <p className="text-white-500">{event.description}</p>
            <div className="flex justify-between w-full">
              <p className="text-custom-text-color">{formatDate(event.date)}</p>
              <p className="text-custom-text-color">{event.location}</p>
            </div>
          </div>
          <div className="h-[1px] bg-white m-4 mt-6" />
          <div className="flex my-4 justify-center">
            {
              event.reviews.length > 0 &&
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {event.reviews.map(item => {
                  return (
                      <Review hasFixed={true} review={item} key={`rvw_${item.id}`} />
                  );
                })}
              </div>
            }
          </div>
          <div className="flex flex-col justify-around h-[220px] rounded-xl shadow-lg border border-gray-400 p-4">
            <div className="flex flex-col items-center justify-center w-full h-1/3">
              <div>Etkinliği aşağıdan puanlayabilir ve yorum yazabilirsiniz.</div>
              <Review setRating={setRating} hasFixed={false} />
            </div>
            <div className="h-2/3 flex items-center px-4 mt-4 rounded-xl">
              <textarea
                className="w-full h-full py-2 px-3 rounded resize-none"
                placeholder="Yorumunuzu yazın"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div onClick={handleSubmit} className="mt-4 border cursor-pointer hover:bg-blue-500 border-gray-400 rounded-xl flex justify-center">
              <button type='submit'>Kaydet</button>
            </div>
        </div>
        </div>
      </SimpleModal>
    </>
  );
};

export default Event;
