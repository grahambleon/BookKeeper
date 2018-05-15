class Api::V1::InvoicesController < ApplicationController

  protect_from_forgery unless: -> { request.format.json? }

  def create
    @account = Account.find_by(id: params["company_id"])
    @invoice = Invoice.create!(invoice_number: params["invoice_number"], amount: params["amount"], date_received: params["date"], user: current_user, account: @account)
    params["purchases"].each do |purchase|
      Purchase.create!(
        product_id: purchase["product_id"],
        product_name: purchase["product_name"],
        quantity: purchase["quantity"],
        unit_price: purchase["unit_price"],
        total_price: purchase["total_price"],
        user: current_user,
        account: @account,
        invoice: @invoice
      )

    render json: @invoice, include: ['purchases']
    end
  end

#   private
#
# def review_params
#   params.require(:review).permit(:title, :body, :rating, :place_id)
# end
end
