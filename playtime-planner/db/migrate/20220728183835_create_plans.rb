class CreatePlans < ActiveRecord::Migration[7.0]
  def change
    create_table :plans do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.decimal :width
      t.decimal :height
      t.decimal :left
      t.decimal :top

      t.timestamps
    end
  end
end
