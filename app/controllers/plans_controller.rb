class PlansController < ApplicationController
  def create
    user = User.find(session[:user_id])
    plan = Plan.create!(top: params[:top], left: params[:left], width: params[:width], height: params[:height], name: params[:name], description: params[:description], user_id: session[:user_id])
    render json: plan, status: :ok
  end

  def update
    plan = Plan.find(params[:id])
    plan.update(parameters)
    render json: plan, status: :ok
  end

  def destroy
    plan = Plan.find(params[:id])
    plan.destroy
    render json: plan, status: :ok
  end

  private

  def parameters
    params.permit(:top, :left, :width, :height, :name, :description, :user_id, :id)
  end
end
