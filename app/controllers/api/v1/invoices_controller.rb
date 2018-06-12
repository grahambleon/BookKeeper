class Api::V1::InvoicesController < ApplicationController
  # skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

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
      if params["purchases"]
        JSON.parse(params["purchases"]).each do |purchase|
          Purchase.create!(purchase_params(purchase, @invoice))
        end
      end
      render json: @invoice, each_serializer: InvoiceListSerializer
    else
      render json: @invoice.errors.full_messages, status: :unprocessable_entity
    end
  end

  def date
    @invoice = Invoice.where(date_received: params["date"])

    render json: @invoice, each_serializer: InvoiceShowSerializer
  end

  def invoice_number
    @invoice = Invoice.where(invoice_number: params["invoice_number"])

    render json: @invoice, each_serializer: InvoiceShowSerializer
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
