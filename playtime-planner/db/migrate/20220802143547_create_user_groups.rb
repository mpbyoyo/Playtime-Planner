class CreateUserGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :user_groups do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :grouped_planner, null: false, foreign_key: true

      t.timestamps
    end
  end
end
