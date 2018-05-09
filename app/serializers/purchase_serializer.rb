class PurchaseSerializer < ActiveModel::Serializer
  attributes :id, :product_id, :product_name, :quantity, :unit_price, :account_id, :invoice_id
end
