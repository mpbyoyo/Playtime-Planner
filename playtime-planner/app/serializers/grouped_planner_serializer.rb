class GroupedPlannerSerializer < ActiveModel::Serializer
  attributes :id, :name, :plans, :users
end
