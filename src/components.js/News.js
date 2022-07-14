import React from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function News() {
  const [news, setNews] = React.useState([]);

  const options = {
    method: "GET",
    url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-coronavirus-news/0",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_NEWS_API,
      "X-RapidAPI-Host":
        "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    },
  };

  const getNews = async () => {
    const response = await axios.request(options);
    let uniqueNews = [...response.data.news];
    for (let i = 0; i < uniqueNews.length; i++) {
      for (let j = i + 1; j < uniqueNews.length; j++) {
        if (uniqueNews[i].title === uniqueNews[j].title) {
          uniqueNews.splice(i, 1);
        }
      }
    }
    for (let i = 0; i < uniqueNews.length; i++) {
      uniqueNews[i].title = uniqueNews[i].title.replace("&#8216;", "");
      uniqueNews[i].title = uniqueNews[i].title.replace("&#8217;", "");
      uniqueNews[i].content = uniqueNews[i].content.split("[")[0];
      uniqueNews[i].content = uniqueNews[i].content.replace(
        /(<([^>]+)>)/gi,
        ""
      );
    }
    setNews(uniqueNews);
  };

  React.useEffect(function () {
    getNews();
  }, []);

  return (
    <div className="News">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={4}
        loop={false}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="Carousel"
      >
        {news.map(function (el) {
          return (
            <SwiperSlide>
              <div className="card">
                <a
                  href={el.link}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <img
                    src={el.urlToImage}
                    alt="new"
                    width="200px"
                    height="120px"
                  />
                  <h3>{el.title}</h3>
                  <p>{el.content}</p>
                  <p>
                    {Math.floor(
                      (Date.now() - Date.parse(el.pubDate)) * 2.7778 * 10 ** -7
                    ) === 1
                      ? "1 hour "
                      : Math.floor(
                          (Date.now() - Date.parse(el.pubDate)) *
                            2.7778 *
                            10 ** -7
                        ) + " hours "}
                    ago
                  </p>
                </a>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default News;
