class CreatePlans < ActiveRecord::Migration[7.0]
  def change
    create_table :plans do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :plan_name
      t.string :plan_description
      t.integer :width
      t.integer :height
      t.integer :left
      t.integer :top

      t.timestamps
    end
  end
end
