import News from "../../../utils/news";
import "./News.css";

function NewsList(props: any) {
  const { name, news } = props;
  return (
    <div className="news-list">
      <h2 className="news-list-heading">{name}</h2>
      {news.map((item: any) => (
        <div key={item.id} className="news-item-container">
          <h3 className="news-item-heading">{item.Title}</h3>
          <p className="news-item-text">{item.Content}</p>
          <p className="news-item-date">{item.Date}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
