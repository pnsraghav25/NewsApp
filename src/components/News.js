import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
export class News extends Component {
    articles = []
    constructor(){
        super();
        this.state={
            articles : [],
            loading : false,
            page : 1
        }
    }
    async componentDidMount(){
        const lower = this.props.category.toLowerCase();
        const newstr = lower.charAt(0).toUpperCase() + lower.slice(1)
        this.props.setProgress(0);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=500a80d9c5c0490aabc6c9a25e764b98&page=1&pageSize=${this.props.pagesize}`
        this.setState({loading : true})
        document.title = `${newstr} - NewsMonkey`
        let data=await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles : parsedData.articles,
            totalResults : parsedData.totalResults,
            loading : false
        })
        this.props.setProgress(100);
    }
    handlePrevClick= async ()=>{
        this.props.setProgress(0);
        console.log("Previous")
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=500a80d9c5c0490aabc6c9a25e764b98&page=${this.state.page- 1}&pageSize=${this.props.pagesize}`
        this.setState({loading : true})
        let data=await fetch(url)
        let parsedData = await data.json()
        this.setState({
            page : this.state.page - 1,
            articles : parsedData.articles,
            loading : false
        })
        
        this.props.setProgress(100);
    }
    handleNextClick=async ()=>{
        this.props.setProgress(0);
        if(!(Math.ceil(this.state.page + 1 > this.state.totalResults/this.props.pagesize))){
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=500a80d9c5c0490aabc6c9a25e764b98&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`
            this.setState({loading : true})
            let data=await fetch(url)
            let parsedData = await data.json()
            this.setState({
                page : this.state.page  + 1,
                articles : parsedData.articles,
                loading : false
            })
        }
        this.props.setProgress(100);
    }
    render() {
        let cat = this.props.category
        let cat_name = ""
        cat_name = cat.charAt(0).toUpperCase()+cat.slice(1)
        return (
            <>
                <div className="container my-3">
                    <h3 className='text-center' style={{marginTop:"80px",marginBottom:"30px"}}>News Monkey- Top {cat_name} Headlines</h3 >
                    {this.state.loading && <Spinner/>}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0,45)+" ...":""} description={element.description?element.description.slice(0,88)+" ...":""} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author ? "Admin" :element.author} date={element.publishedAt}/>
                            </div>
                        })}
                    </div>
                </div>
                <div className="container my-5 d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-primary btn-small" onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button disabled={Math.ceil(this.state.page + 1 > this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-primary btn-small" onClick={this.handleNextClick} >Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News