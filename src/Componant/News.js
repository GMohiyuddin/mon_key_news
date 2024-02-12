import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  constructor(props) {
    super(props);
    console.log("constructor")
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `Monn_Key news - ${this.capitalLetter(this.props.category)}`
  }
  async Update() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}
                  &category=${this.props.category}
                  &apiKey=2e6d75fe57874f6784f5b0eacaf8c63e
                  &page=${this.state.page}&
                  pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(60);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,
                     totalResults: parsedData.totalResults,
                      loading: false });
    this.props.setProgress(100);
  }
  

  async componentDidMount() {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e6d75fe57874f6784f5b0eacaf8c63e&page=1&pageSize=${this.props.pageSize}`;

    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    // this.setState({ loading: false });

    this.Update()
  }

 

  // handlePrevClick = async () => {

  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e6d75fe57874f6784f5b0eacaf8c63e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({ loading: true });
  //   // console.log(parsedData);

  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false
  //   // })

  //   this.setState({ page: this.state.page - 1 });
  //   this.Update();
  // }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e6d75fe57874f6784f5b0eacaf8c63e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    this.setState({ page: this.state.page + 1 })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
      // loading: false
    });
  };

  // handleNextClick = async () => {

  //   // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

  //   // }
  //   // else {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e6d75fe57874f6784f5b0eacaf8c63e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({ loading: true });
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   this.setState({ loading: false });

  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parsedData.articles
  //   //   })
  //   // }

  //   if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
  //     this.Update();
  //   }
  //   else {
  //     this.setState({ page: this.state.page + 1 });
  //     this.Update();
  //   }
  // }

  render() {
    return (
      <>
        <h2 className="text-center">Top Headlines - {this.capitalLetter(this.props.category)}</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItems title={element.title ? element.title : ""}
                    description={element.description ? element.description.slice(0, 50) : ""}
                    newsUrl={element.url ? element.url : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : ""}
                    publishedAt={element.publishedAt ? element.publishedAt : "Undefine"}
                    author={element.author ? element.author : "Unknow"}
                    source={element.source} />
                </div>
              })
              }
            </div>
          </div>
        </InfiniteScroll>


        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1}
            type="button" className="btn btn-dark"
            onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>


    )
  }
}

export default News