module Seeders
  module Reviews
    REVIEWS = [
      {
        description: "Vinyl blue bottle echo park, ramps hella art party cliche tousled humblebrag forage venmo keffiyeh. books in our time have touched so many readers.",
        score: 5,
        book_id: 1
      },
      {
        description: "Vinyl blue bottle echo park, ramps hella art party cliche tousled humblebrag forage venmo keffiyeh. books in our time have touched so many readers.",
        score: 7,
        book_id: 2
      },
      {
        description: "Vinyl blue bottle echo park, ramps hella art party cliche tousled humblebrag forage venmo keffiyeh. books in our time have touched so many readers.",
        score: 2,
        book_id: 2
      },
      {
        description: "Vinyl blue bottle echo park, ramps hella art party cliche tousled humblebrag forage venmo keffiyeh. books in our time have touched so many readers.",
        score: 8,
        book_id: 1
      }
    ]

    def self.seed
      REVIEWS.each do |review|
        Review.find_or_create_by(review)
      end
    end
  end
end
