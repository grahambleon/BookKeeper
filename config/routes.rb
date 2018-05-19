Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :accounts
    end
  end

  namespace :api do
    namespace :v1 do
      get "/graph", to: "accounts#graph"
    end
  end

  namespace :api do
    namespace :v1 do
      resources :invoices
    end
  end

  namespace :api do
    namespace :v1 do
      resources :purchases
    end
  end

  resources :accounts, only: [:index]
  resources :invoices, only: [:new]
end
