class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :description, null: false
      t.integer :score, null: false
      t.integer :book_id, null: false

      t.timestamps null: false
    end
  end
end
