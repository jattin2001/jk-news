import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0)

  const updateNews= async(page = 1)=>{
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiId}&pageSize=${props.pageSize}&category=${props.category}&page=${page}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    updateNews();
  }, []);
  


  const capitalized = (word) => word && word.charAt(0).toUpperCase() + word.slice(1);


  const fetchMoreData = async () => {
    const { pageSize, category } = props;
    setLoading(true)
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiId}&pageSize=${pageSize}&category=${category}&page=${page + 1}`);
      const { articles: newArticles, totalResults } = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setTotalResults(totalResults);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };
  

    document.title = `${capitalized(props.category)} - Jk News`;

    return (
      <>
        <h1 className="text-primary text-center">
          Top {capitalized(props.category)} Headlines
        </h1>
        {loading && <Loader />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading && <Loader />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element, index) => {
                return (
                  <div className="col-md-4 my-2" key={index}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2938&q=80"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }


News.defaultProps = {
  pageSize: 5,
  category: "general",
};
News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
};