class PlanSerializer < ActiveModel::Serializer
  attributes :id, :plan_name, :plan_description, :width, :height, :left, :top
  has_one :User
end
