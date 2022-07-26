class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = User.create(parameters)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else render json: { errors: user.errors.full_messages }, status: :unprocessable_entity end
  end

  def show
    user = User.find(session[:user_id])
    render json: user
  end

  def update_pfp
    user = User.find(session[:user_id])
    user.update(pfp: params[:pfp])
  end

  def index
    users = User.all
    searched_users = user.filter {|e| e.username.include?(params[:search])}
    render json: searched_users
  end

  def add_friend
    user = User.find(session[:user_id])
    new_friend = User.find_by!(username: params[:friend_username])
    new_friend.friends << user
    render json: user, status: :created
  end

  def remove_friend
    user = User.find(session[:user_id])
    friend = User.find(params[:friend_id])
    user.friends.delete(friend.id)
    if friend.friends.include? user
      friend.friends.delete(user.id)
    end
    render json: user, status: :ok
  end

  def handle_pending
    pendee = User.find_by!(username: params[:pendee])
    user = User.find(session[:user_id])
    if params[:accepted?]
      UsersUser.where(user_id: pendee.id, friend_id: user.id).update_all(pending: false)
      pendee.friends << user
      UsersUser.where(user_id: user.id, friend_id: pendee.id).update_all(pending: false)
      render json: user, status: :ok
    else
      UsersUser.delete_by(user_id: pendee.id, friend_id: user.id)
      UsersUser.delete_by(user_id: user.id, friend_id: pendee.id)
      render json: user, status: :ok
    end
  end

  private

  def parameters
    params.permit(:username, :password, :password_confirmation)
  end
end
