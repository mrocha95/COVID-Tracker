import React from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper";
import { Pagination, Navigation } from "swiper";

function News() {
  const [news, setNews] = React.useState([]);

  //   const options = {
  //     method: "GET",
  //     url: "https://covid-19-news.p.rapidapi.com/v1/covid",
  //     params: { q: "covid", lang: "en", media: "True" },
  //     headers: {
  //       "X-RapidAPI-Key": "c5d9e92318mshbdf74a4399e20e7p10cf47jsna24ac16729ea",
  //       "X-RapidAPI-Host": "covid-19-news.p.rapidapi.com",
  //     },
  //   };

  const options = {
    method: "GET",
    url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-coronavirus-news/0",
    headers: {
      "X-RapidAPI-Key": "c5d9e92318mshbdf74a4399e20e7p10cf47jsna24ac16729ea",
      "X-RapidAPI-Host":
        "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    },
  };

  const getNews = async () => {
    const response = await axios.request(options);
    let uniqueNews = [...response.data.news];
    // console.log(response.data.news);
    for (let i = 0; i < uniqueNews.length; i++) {
      for (let j = i + 1; j < uniqueNews.length; j++) {
        if (uniqueNews[i].title === uniqueNews[j].title) {
          uniqueNews.splice(i, 1);
        }
      }
    }
    for (let i = 0; i < uniqueNews.length; i++) {
      console.log(uniqueNews[i].content);
      uniqueNews[i].title = uniqueNews[i].title.replace("&#8216;", "");
      uniqueNews[i].title = uniqueNews[i].title.replace("&#8217;", "");
      uniqueNews[i].content = uniqueNews[i].content.split("[")[0];
      uniqueNews[i].content = uniqueNews[i].content.replace(
        /(<([^>]+)>)/gi,
        ""
      );
    }
    console.log(uniqueNews);
    setNews(uniqueNews);
  };

  React.useEffect(function () {
    getNews();
  }, []);

  return (
    <div className="News">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
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
              <table>
                <tr>
                  <img
                    src={el.urlToImage}
                    alt="new"
                    width="180px"
                    height="120px"
                  />
                </tr>
                <tr>
                  <h3>{el.title}</h3>
                </tr>
                <tr>
                  <p>{el.content}</p>
                </tr>
                <tr>
                  <p>{el.pubDate}</p>
                </tr>
              </table>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default News;
