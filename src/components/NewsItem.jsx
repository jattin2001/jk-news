import React from "react";

export default function NewsItem (props) {
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className="card">
        <div style={{display:"flex", position:"absolute", right:"0"}}><span className="badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {source} </span></div>
        <img src={imageUrl} className="card-img-top" alt={title} />
        <div className="card-body">
        <h5 className="card-title">{title} 
        </h5>
          <p className="card-text">
            {description}
          </p>
          <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toLocaleString()}</small></p>
          <a href={newsUrl} target="_blank" className="btn btn-primary">
            Read More
          </a>

        </div>
      </div>
    );
}
