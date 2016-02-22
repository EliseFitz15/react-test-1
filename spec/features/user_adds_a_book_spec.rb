require "spec_helper"

feature "user adds a book" do
  scenario "user adds a book", js: true do
    visit "/"
    expect(page).not_to have_content "Book Title"
    expect(page).to have_content "Books"
    expect(page).to have_content "Add A Book"
    click_on "Add a Book"

    fill_in :book_title, with: "Book Title"
    fill_in :book_author, with: "Book Author"
    fill_in :book_description, with: "This is the description for a book that is interesting"
    click_on "Add"
    expect(page).to have_content "Book Title"
  end
end
