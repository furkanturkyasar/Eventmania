import { UserReview } from '../types/events.ts';
import { StarRating } from './Rating.tsx';

interface ReviewProps {
    review?: UserReview
    hasFixed: boolean
    setRating?: (rating: number) => void
}

const Review: React.FC<ReviewProps> = ({ review, hasFixed, setRating }) => {

  return (
    <div className="flex flex-col gap-2">
        {review && review.comment}
        <StarRating hasFixed={hasFixed} onRatingChanged={(val) => {
            if (setRating) {
              setRating(val)
            }
          }
          } value={review ? review.rating : 0} />
    </div>
  )
}

export default Review