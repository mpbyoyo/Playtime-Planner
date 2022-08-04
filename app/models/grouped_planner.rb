class GroupedPlanner < ApplicationRecord
  validates :name, presence: true
  has_many :user_groups
  has_many :users, through: :user_groups
  has_many :plans, through: :users
end
