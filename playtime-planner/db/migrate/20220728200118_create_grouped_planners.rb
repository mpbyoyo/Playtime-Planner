class CreateGroupedPlanners < ActiveRecord::Migration[7.0]
  def change
    create_table :grouped_planners do |t|

      t.timestamps
    end
  end
end
