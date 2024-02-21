import { useParams } from "react-router-dom";
import { useNewsState } from "../../store/store";
import { Card, Image } from "antd";
import styles from "./NewsItem.module.css";
export default function NewsItem() {
  //Забираем id с роута
  const { articleId } = useParams();
  const article = useNewsState(
    (state) => state.news.articles[Number(articleId)],
  );
  if (article) {
    return (
      <div className={styles.cardItemContainer}>
        <Card
          hoverable
          style={{
            overflowX: "hidden",
            height: "100vh",
          }}
          title={article.title}
          cover={<Image src={article.urlToImage} />}
        >
          <div className={styles.cardItem}>
            <div className={styles.cardItemContent}>
              <span>{article.content}</span>
            </div>
            <div className={styles.cardItemFooter}>
              <span>
                {" "}
                Дата публикации: {new Date(article.publishedAt).toDateString()}
              </span>
              <span>Автор: {article.author}</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  return <div>Данные о статье не обнаружены</div>;
}
