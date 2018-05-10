class HomesController < ApplicationController
  def index
    check_user_auth
  end
end
