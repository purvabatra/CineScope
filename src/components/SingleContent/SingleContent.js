import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <div className="media">
        <div className="poster-container">
          <img
            className="poster"
            src={poster ? `${img_300}/${poster}` : unavailable}
            alt={title}
          />
          <span className={`vote-badge ${vote_average > 6 ? "good" : "average"}`}>
            {vote_average}
          </span>
        </div>
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"} &nbsp;
          <span className="subTitle">{date}</span>
        </span>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
