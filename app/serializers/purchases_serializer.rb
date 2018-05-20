class PurchasesSerializer < ActiveModel::Serializer
  attributes :id, :product_id, :product_name, :quantity, :unit_price, :total_price
end
