class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :width, :height, :left, :top, :created_at
end
