var Review = React.createClass({
  rawMarkup: function() {
  var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
  return { __html: rawMarkup };
  },
  render: function() {
   return (
     <div className="review">
       <h4 className="reviewDescription">
         {this.props.description}
       </h4>
       <span dangerouslySetInnerHTML={this.rawMarkup()} />
     </div>
   );
  }
})
//
var ReviewList = React.createClass({
  render: function() {
    var reviewNodes = this.props.data.map(function(review) {
      return (
        <Review description={review.description} key={review.id}>
          {review.score}
          {review.book_id}
        </Review>
      );
    });
    return (
      <div className="reviewList">
        {reviewNodes}
      </div>
    );
  }
});
//
var ReviewForm = React.createClass({
  getInitialState: function() {
    return {description: '', score: '', book_id: ''};
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },
  handleScoreChange: function(e) {
    this.setState({score: e.target.value});
  },
  handleBookidChange: function(e) {
    this.setState({book_id: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var description = this.state.description.trim();
    var score = this.state.score.trim();
    var book_id = this.state.book_id.trim();
    if (!description || !score || !book_id) {
      return;
    }
    this.props.onReviewSubmit({description: description, score: score, book_id: book_id});
    this.setState({description: '', score: '', book_id: ''});
  },
  render: function() {
    return (
      <form className="reviewForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Add review here"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <input
          type="text"
          placeholder="Score on a scale 1-10"
          value={this.state.score}
          onChange={this.handleScoreChange}
        />
        <input
          type="text"
          placeholder="Book id"
          value={this.state.book_id}
          onChange={this.handleBookidChange}
        />
        <input type="submit" value="Add Review" />
      </form>
    );
  }
});
//
var ReviewBox = React.createClass({
  loadReviewsFromServer: function() {
    $.ajax({
      url: "/api/v1/books/1",
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleReviewSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadReviewsFromServer();
    setInterval(this.loadReviewsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="reviewBox">
        <h1>Reviews</h1>
        <ReviewList data={this.state.data} />
        <ReviewForm onReviewSubmit={this.handleReviewSubmit}/>
      </div>
    );
  }
});
//
ReactDOM.render(
  <ReviewBox url="/api/v1/books/:id" pollInterval={2000}/>,
  document.getElementById("book_content")
);
