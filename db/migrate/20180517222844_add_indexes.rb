class AddIndexes < ActiveRecord::Migration[5.2]
  def change
    add_index :accounts, :company_name
    add_index :invoices, :date_received
    add_index :invoices, :invoice_number
  end
end
