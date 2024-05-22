import { FaStar } from "react-icons/fa6";

const Star = ({ rating }) => {
  const val = Math.round(rating);
  const totalRating = Array(val || 0).fill(<FaStar />);
  return (
    <div className="flex gap-1 text-sm text-yellow-400">
      {totalRating?.map((r, ind) => (
        <span key={ind}>
          <FaStar />
        </span>
      ))}
    </div>
  );
};

export default Star;
