class GroupedPlannersController < ApplicationController
  def index
    groups = GroupedPlanner.where(user_id: session[:user_id])
    render json: groups, status: :ok
  end

  def create
    user = User.find(session[:user_id])
    group = GroupedPlanner.create!(name: params[:name], user_id: user.id)

    users = params[:users]
    users << user.username
    users.each do |username|
      if username != user.username
      user = User.find_by(username: username)
      group.users << user
      end
    end

    render json: group, status: :created
  end

  def update
    group = GroupedPlanner.find(params[:id])
    if params[:name]
      group.update(name: params[:name])
      render json: group, status: :ok
    elsif params[:user_id]
      user = User.find(params[:user_id])
      group.users.delete(user)
      render json: group, status: :ok
    else
      render json: group.errors, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(session[:user_id])
    group = GroupedPlanner.find(params[:id])
    UserGroup.delete_by(grouped_planner_id: group.id)
    group.destroy
    
    head :no_content
  end
end
