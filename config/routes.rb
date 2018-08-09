Rails.application.routes.draw do
  resources :projects
  resources :users

  # session controllers
  post 'login', to: 'session#login'
  get 'logout', to: 'session#logout'
end
