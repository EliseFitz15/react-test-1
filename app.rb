require "json"
require "sinatra/base"
require "sinatra/activerecord"
require 'tilt/erb'
require "pry"

Dir["./models/*.rb"].each { |file| require file }
Dir["./seeders/*.rb"].each { |file| require file }

class App < Sinatra::Base
  get("/") do
    erb :index
  end

  get("/api/v1/books") do
    content_type :json
    Book.order(:created_at).to_json
  end

  post("/api/v1/books") do
    book = Book.new(title: params[:title], author: params[:author], description: params[:description])
    if book.save!
      status 201
      headers "Location" => "/api/v1/books/#{book.id}"
    else
      status 400
    end
  end

  get "/books/:id" do
    erb :show
  end

  get "/api/v1/books/1" do
    content_type :json
    @book = Book.find(1)
    {
      book: @book,
      reviews: @book.reviews
    }.to_json
  end

  post("/api/v1/books/:id") do
    review = Review.new(description: params[:description], score: params[:score], book_id: params[:book_id])
    if review.save!
      status 201
      headers "Location" => "/api/v1/books/#{book.id}"
    else
      status 400
    end
  end
end

  # post "/book/:id/reviews/new" do
  #   book = Book.find(params[:id].to_i)
  #   Review.create(
  #     book: book,
  #     score: params[:review_score].to_i,
  #     description: params[:review_description]
  #   )
  #   redirect to("/book/#{book.id}")
  # end

  # get "/books/new" do
  #   erb :books_new
  # end
  #
  # post "/books/new" do
  #   Book.create(
  #     title: params[:title],
  #     author: params[:author],
  #     description: params[:description]
  #   )
  #   redirect to("/")
  # end
  #
  # #API endpoints
  # get "/api/v1/book/:id" do
  #   content_type :json
  #   @book = Book.find(params[:id].to_i)
  #   {
  #     book: @book,
  #     reviews: @book.reviews
  #   }.to_json
  # end
  #
  # get "/api/v1/books" do
  #   content_type :json
  #   @books = Book.order(:title)
  #   books = []
  #   @books.each do |book|
  #     books << {
  #       book: book,
  #       review_score: book.average_review_score,
  #       reviews: book.reviews
  #     }
  #   end
  #   books.to_json
  # end
  #
  # post "/api/v1/books/new" do
  #   book = Book.create(
  #     title: params[:title],
  #     author: params[:author],
  #     description: params[:description]
  #   )
  #   if book.valid?
  #     status 200
  #   else
  #     status 422
  #   end
  # end
  #
  # post "/api/v1/book/:id/reviews/new" do
  #   book = Book.find(params[:id].to_i)
  #   review = Review.create(
  #     book: book,
  #     score: params[:review_score].to_i,
  #     description: params[:review_description]
  #   )
  #   if review.valid?
  #     status 200
  #   else
  #     status 422
  #   end
  # end
