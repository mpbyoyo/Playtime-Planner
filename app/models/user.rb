class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true

  has_and_belongs_to_many :friends, class_name: "User", foreign_key: :friend_id
  has_many :plans
  has_many :user_groups
  has_many :grouped_planners, through: :user_groups
end
