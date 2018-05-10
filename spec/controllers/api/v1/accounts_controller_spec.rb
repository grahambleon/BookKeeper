require 'rails_helper'

RSpec.describe Api::V1::AccountsController, type: :controller do
  let!(:user) { User.create!(email: "me@aol.com", business_name: "ehhh", password: "123456", address:"123 fake street") }
  let!(:account) { Account.create!(company_name: "Russo's", user: user) }
  let!(:invoice) { Invoice.create!(invoice_number: "1337", amount: 200.00, date_received: "2/4/2017", account: account, user: user) }
  let!(:purchase) { Purchase.create!(product_id: "0293874", product_name: "Taters", quantity: "30 lbs",  unit_price: 3.00, account: account, user: user, invoice: invoice) }

  describe "GET#index" do
    it "should return a list of all accounts and associated invoices and purchases when logged in" do

      sign_in user

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json.first["company_name"]).to eq("Russo's")

      expect(returned_json.first["invoices"].length).to eq 1
      expect(returned_json.first["invoices"].first["invoice_number"]).to eq("1337")

      expect(returned_json.first["invoices"].first["purchases"].length).to eq 1
      expect(returned_json.first["invoices"].first["purchases"].first["product_name"]).to eq("Taters")
    end
  end
end
