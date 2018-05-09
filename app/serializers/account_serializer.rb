class AccountSerializer < ActiveModel::Serializer
  attributes :id, :company_name
  
  has_many :invoices
end
