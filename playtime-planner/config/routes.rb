Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/friends', to: 'users#add_friend'
  delete '/friends/:friend_id', to: 'users#remove_friend'
  get '/users', to: 'users#index'
  patch '/pending', to: 'users#handle_pending'
end
