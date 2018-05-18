class Api::V1::InvoicesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @invoices = Invoice.where(user_id: current_user)

    render json: @invoices, each_serializer: InvoiceListSerializer
  end

  def show
    @invoice = Invoice.where(id: params["id"])

    render json: @invoice, each_serializer: InvoiceShowSerializer
  end

  def create

    @invoice = Invoice.new(invoice_params)
    @invoice.user = current_user

    if @invoice.save!
      JSON.parse(params["purchases"]).each do |purchase|
        binding.pry
        Purchase.create!(purchase_params(purchase, @invoice))
      end
      render json: @invoice, each_serializer: InvoiceListSerializer
    else
      render json: @invoice.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def invoice_params
    params.permit(:invoice_number, :amount, :date_received, :invoice_image, :account_id)
  end

  def purchase_params(purchase, invoice)
    {
      product_id: purchase["product_id"],
      product_name: purchase["product_name"],
      quantity: purchase["quantity"],
      unit_price: purchase["unit_price"],
      total_price: purchase["total_price"],
      user: current_user,
      account_id: params["account_id"],
      invoice: invoice
    }
  end
end
