class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|
      t.string :invoice_number, null: false
      t.decimal :amount, null: false
      t.string :date_received, null: false

      t.belongs_to :account, null: false
      t.belongs_to :user, null: false

      t.timestamps
    end
  end
end
