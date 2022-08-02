class GroupedPlannersController < ApplicationController
  def index
    group_relations = UserGroup.where(user_id: session[:user_id])
    groups = group_relations.map { |relation| relation.grouped_planner }
    render json: groups, status: :ok
  end

  def create
    user = User.find(session[:user_id])
    group = GroupedPlanner.create!(name: params[:name])
    user.grouped_planners << group

    users = params[:users]
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
    if group.update(name: params[:name])
      render json: group, status: :ok
    else
      render json: group.errors, status: :unprocessable_entity
    end
  end

  def destroy
    group = GroupedPlanner.find(params[:id])
    group.destroy
    head :no_content
  end
end
