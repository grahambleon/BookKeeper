class Api::V1::InvoicesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
binding.pry
    @account = Account.find_by(id: params["company_id"])
    @invoice = Invoice.create!(invoice_number: params["invoice_number"], amount: params["amount"], date_received: params["date"], user: current_user, account: @account, invoice_image: params["invoice_image"])
    JSON.parse(params["purchases"]).each do |purchase|
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

    render json: @invoice
    end
  end

  # private
  #
  # def invoice_params
  #   params.require(:invoice).permit(:invoice_number, :company_id, :amount, :date, :invoice_image)
  # end
  #
  # def account_params
  #   params.permit(:company_id)
  # end
  #
  # def purchase_params
  #   params.permit(:product_id, :product_name, :quantity, :unit_price, :total_price)
  # end
end
