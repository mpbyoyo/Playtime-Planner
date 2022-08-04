class Plan < ApplicationRecord
  validates :name, presence: true
  validates :height, presence: true, numericality: { greater_than_or_equal_to: 0 }, numericality: { less_than_or_equal_to: 100 }
  validates :width, presence: true, numericality: { greater_than_or_equal_to: 0 }, numericality: { less_than_or_equal_to: 100 }
  validates :left, presence: true, numericality: { greater_than_or_equal_to: 0 }, numericality: { less_than_or_equal_to: 100 }
  validates :top, presence: true, numericality: { greater_than_or_equal_to: 0 }, numericality: { less_than_or_equal_to: 100 }

  belongs_to :user
end
