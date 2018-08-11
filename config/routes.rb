Rails.application.routes.draw do
  resources :todos
  resources :projects
  resources :users

  # session controllers
  post 'login', to: 'session#login'
  get 'logout', to: 'session#logout'
  get 'loggedin', to: 'session#loggedin'

  # index/root
  root to: 'application#startapp'
end
