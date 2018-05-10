class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
   devise_parameter_sanitizer.permit(:sign_up, keys: [:business_name, :address, :email, :password, :password_confirmation])
   devise_parameter_sanitizer.permit(:sign_in, keys: [:login, :password, :password_confirmation])
   devise_parameter_sanitizer.permit(:account_update, keys: [:business_name, :address, :email, :password, :password_confirmation, :current_password])
  end

  def check_user_auth
    unless current_user
      redirect_to new_user_registration_path
    end
  end
end
