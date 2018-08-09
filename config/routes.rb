Rails.application.routes.draw do
  resources :todos
  resources :projects
  resources :users

  # session controllers
  post 'login', to: 'session#login'
  get 'logout', to: 'session#logout'

  # index/root
  root to: 'application#startapp'
end
