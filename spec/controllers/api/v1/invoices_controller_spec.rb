require 'rails_helper'

RSpec.describe Api::V1::InvoicesController, type: :controller do
  let!(:user) { User.create!(email: "me@aol.com", business_name: "ehhh", password: "123456", address:"123 fake street") }
  let!(:account) { Account.create!(company_name: "Russo's", user: user) }
  let!(:invoice) { Invoice.create!(invoice_number: "1337", amount: 200.00, date_received: "2/4/2017", account: account, user: user) }
  let!(:purchase) { Purchase.create!(product_id: "0293874", product_name: "Taters", quantity: "30 lbs",  unit_price: 3.00, total_price: 90.00, account: account, user: user, invoice: invoice) }

  describe "GET#index" do
    it "should return a list of all invoices and their basic info" do

      sign_in user

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json.first["invoice_number"]).to eq("1337")
    end
  end

  describe "GET#show" do
    it "should return a specific invoice" do

      sign_in user

      get :show, params: { id: invoice.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
    end

    it "should return a specific invoice's account ID" do
      sign_in user

      get :show, params: { id: invoice.id }
      returned_json = JSON.parse(response.body)

      expect(returned_json.first["account_id"]).to eq(account.id)
    end

    it "should return a specific invoice's purchases" do
      sign_in user

      get :show, params: { id: invoice.id }
      returned_json = JSON.parse(response.body)

      expect(returned_json.first["purchases"].length).to eq(1)
      expect(returned_json.first["purchases"].first["product_name"]).to eq("Taters")
    end
  end
end
