class InvoicesController < ApplicationController
  def new
    check_user_auth
  end
end
