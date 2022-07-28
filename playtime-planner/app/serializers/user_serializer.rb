class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :pfp, :friend_list, :pending_list

  has_many :plans

  def friend_list
    friends = UsersUser.where(friend_id: object.id, pending: false)
    friends.map do |e|
      friend = User.find(e.user_id)
      {
        id: friend.id,
        username: friend.username, 
        pfp: friend.pfp
      }
    end
  end

  def pending_list
    pending = UsersUser.where(friend_id: object.id, pending: true)
    pending.map {|e| {username: User.find(e.user_id).username, pfp: User.find(e.user_id).pfp}}
  end
end
