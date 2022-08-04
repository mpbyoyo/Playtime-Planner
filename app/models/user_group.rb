class UserGroup < ApplicationRecord
  belongs_to :user
  belongs_to :grouped_planner
end
