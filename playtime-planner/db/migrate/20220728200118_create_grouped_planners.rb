class CreateGroupedPlanners < ActiveRecord::Migration[7.0]
  def change
    create_table :grouped_planners do |t|
      t.string :name

      t.timestamps
    end
  end
end
