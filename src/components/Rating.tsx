import { useEffect, useState } from "react";

interface StarProps {
    marked: boolean
    starId: number
}

const Star: React.FC<StarProps> = ({ marked, starId }) => {
    return (
      <span data-star-id={starId} className={`star ${marked ? 'text-yellow-500' : 'text-gray-400'}`} role="button">
        {marked ? '\u2605' : '\u2606'}
      </span>
    );
};

interface StarRatingProps {
    value: number
    hasFixed: boolean
    onRatingChanged: (val: number) => void
}

export const StarRating: React.FC<StarRatingProps> = ({ value, hasFixed, onRatingChanged }) => {
    const [rating, setRating] = useState(value || 0);
    const [selection, setSelection] = useState(0);

    useEffect(() => {
      if (rating) {
        onRatingChanged(rating)
      }
    }, [rating])
  
    const hoverOver = (event: any) => {
      let val = 0;
      if (event && event.target && event.target.getAttribute('data-star-id'))
        val = event.target.getAttribute('data-star-id');
      setSelection(val);
    };
    return (
      <div
        onMouseOut={() => hoverOver(null)}
        onClick={!hasFixed ? (e: any) => setRating(e.target.getAttribute('data-star-id') || rating) : undefined}
        onMouseOver={!hasFixed ?  hoverOver : undefined}
      >
        {Array.from({ length: 5 }, (v, i) => (
          <Star
            starId={i + 1}
            key={`star_${i + 1}`}
            marked={selection ? selection >= i + 1 : rating >= i + 1}
          />
        ))}
      </div>
    );
  };