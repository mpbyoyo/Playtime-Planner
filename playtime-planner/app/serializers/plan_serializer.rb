class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :width, :height, :left, :top
end
