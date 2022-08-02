class UserGroupSerializer < ActiveModel::Serializer
  attributes :id
  has_one :User
  has_one :GroupedPlanner
end
