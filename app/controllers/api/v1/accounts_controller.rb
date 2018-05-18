class Api::V1::AccountsController < ApplicationController

  protect_from_forgery unless: -> { request.format.json? }

  def index
    @accounts = Account.where(user_id: current_user)

    render json: @accounts, each_serializer: AccountIndexSerializer
  end

  def show
    @account = Account.where(id: params["id"])

    render json: @account, each_serializer: AccountShowSerializer
  end

  def create
    @account = Account.new(account_params)
    @account.user = current_user

    if @account.save!
      render json: @account, each_serializer: AccountIndexSerializer
    else
      render json: @account.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def account_params
    params.permit(:company_name)
  end

end
