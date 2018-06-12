require 'rails_helper'

RSpec.describe Api::V1::AccountsController, type: :controller do
  let!(:user) { User.create!(email: "me@aol.com", business_name: "ehhh", password: "123456", address:"123 fake street") }
  let!(:account) { Account.create!(company_name: "Russo's", user: user) }
  let!(:invoice) { Invoice.create!(invoice_number: "1337", amount: 200.00, date_received: "2/4/2017", account: account, user: user) }
  let!(:purchase) { Purchase.create!(product_id: "0293874", product_name: "Taters", quantity: "30 lbs",  unit_price: 3.00, total_price: 90.00, account: account, user: user, invoice: invoice) }

  describe "GET#index" do
    it "should return a list of all accounts and their basic info" do

      sign_in user

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json.first["company_name"]).to eq("Russo's")
    end
  end

  describe "GET#show" do
    it "should return a specific account and their basic info and corresponding invoices and purchases" do

      sign_in user

      get :show, params: { id: account.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json.first["company_name"]).to eq("Russo's")
      expect(returned_json.first["invoices"].length).to eq 1
    end
  end

  describe "GET#graph" do
    it "should return a specific account and its invoices" do

      sign_in user

      get :graph, params: { id: account.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json.first["company_name"]).to eq("Russo's")
      expect(returned_json.first["invoices"].length).to eq 1
    end
  end

  describe "POST#create" do
    before(:all) do
      @post_json = { company_name: "Paul Marks" }
    end

    it "creates a new account" do

      sign_in user

      prev_count = Account.count
      post(:create, format: JSON, params: @post_json)
      expect(Account.count).to eq(prev_count + 1)
    end

    it "Returns a JSON with the new account" do
      sign_in user

      post(:create, format: JSON, params: @post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["company_name"]).to eq("Paul Marks")
    end
  end
end
