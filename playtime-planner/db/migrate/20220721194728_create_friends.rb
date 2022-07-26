class CreateFriends < ActiveRecord::Migration[7.0]
  def up
    create_table :users_users, id: false do |t|
      t.belongs_to :user
      t.integer :friend_id
      t.boolean :pending, default: true
    end

    add_index(:users_users, [:user_id, :friend_id], unique: true)
    add_index(:users_users, [:friend_id, :user_id], unique: true)
  end

  def down
    remove_index(:users_users, [:friend_id, :user_id])
    remove_index(:users_users, [:user_id, :friend_id])

    drop_table :users_users
  end
end
