class Api::V1::AccountsController < ApplicationController
  def index
    @accounts = Account.where(user_id: current_user)

    render json: @accounts, include: ['invoices', 'invoices.purchases']
  end

  def create

  end
end
