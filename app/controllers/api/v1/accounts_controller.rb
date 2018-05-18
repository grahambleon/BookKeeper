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
    @account = Account.create!(company_name: params["company_name"], user: current_user)

    render json: @account, each_serializer: AccountIndexSerializer
  end
end
