import News from "../../../utils/news";
import "./News.css";

function NewsList({ news, name }: { news: News[]; name: string }) {
  return (
    <div className="news-list">
      <h2 className="news-list-heading">{name}</h2>
      {news.map((item) => (
        <div key={item.id} className="news-item-container">
          <h3 className="news-item-heading">{item.title}</h3>
          <p className="news-item-text">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
