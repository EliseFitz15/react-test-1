var Book = React.createClass({
  renderMarkdown: function() {
    var renderMarkdown = marked(this.props.children.toString(), {sanitize: true});
    return { __html: renderMarkdown };
  },
  render: function() {
    return (
      <div className="book">
        <h4 className="bookTitle">
          {this.props.title}
        </h4>
        <span dangerouslySetInnerHTML={this.renderMarkdown()} />
      </div>
    );
  }
});

var BookList = React.createClass({
  render: function(){
    var bookNodes = this.props.data.map(function(book) {
      return (
        <Book title={book.title} key={book.id}>
          **Author:** {book.author}
          **Description:** {book.description}
        </Book>
      );
    });

    return (
      <div className="bookList">
        {bookNodes}
      </div>
    );
  }
});

var BookForm = React.createClass({
  getInitialState: function() {
    return {title: '', author: '', description: ''};
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var author = this.state.author.trim();
    var description = this.state.description.trim();
    if (!description || !author || !title) {
      return;
    }
    this.props.onBookSubmit({title: title, author: author, description: description});
    this.setState({title: '', author: '', description: ''});
  },
  render: function() {
    return (
      <div className="formWrapper">
        <h3 className="bookFormTitle">
          Add A Book
        </h3>
        <form className="bookForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="book_title"
            placeholder="Book title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <input
            type="text"
            id="book_author"
            placeholder="Book author"
            value={this.state.author}
            onChange={this.handleAuthorChange}
          />
          <input
            type="text"
            id="book_description"
            placeholder="Book description..."
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <input type="submit" value="Add a Book" />
        </form>
      </div>
    );
  }
});

var BooksBox = React.createClass({
  componentDidMount: function() {
    this.loadBooksFromServer();
    setInterval(this.loadBooksFromServer, this.props.pollInterval);
  },
  getInitialState: function() {
    return {data: []};
  },
  loadBooksFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: "GET",
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleBookSubmit: function(book) {
    var books = this.state.data;
    book.id = Date.now();
    var newBooks = books.concat([book]);
    this.setState({data: newBooks});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: book,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="booksBox">
      <h1>Books</h1>
      <BookList data={this.state.data} />
      <BookForm onBookSubmit={this.handleBookSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <BooksBox url="/api/v1/books" pollInterval={10000}/>,
  document.getElementById("book_list")
);
