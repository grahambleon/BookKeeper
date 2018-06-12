require 'rails_helper'

RSpec.describe Api::V1::InvoicesController, type: :controller do

  let!(:user) { User.create!(email: "me@aol.com", business_name: "ehhh", password: "123456", address:"123 fake street") }
  let!(:account) { Account.create!(company_name: "Russo's", user: user) }
  let!(:invoice) { Invoice.create!(invoice_number: "1337", amount: 200.00, date_received: "2/4/2017", account: account, user: user) }
  let!(:purchase) { Purchase.create!(product_id: "0293874", product_name: "Taters", quantity: "30 lbs",  unit_price: 3.00, total_price: 90.00, account: account, user: user, invoice: invoice) }
  before(:each) do
    sign_in user
  end

  describe "GET#show" do

    before(:each) do
      get :show, params: { id: invoice.id }
      @returned_json = JSON.parse(response.body)
    end

    it "should return a specific invoice" do

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(@returned_json.length).to eq 1
    end

    it "should return a specific invoice's account ID" do

      expect(@returned_json.first["account_id"]).to eq(account.id)
    end

    it "should return a specific invoice's purchases" do

      expect(@returned_json.first["purchases"].length).to eq(1)
      expect(@returned_json.first["purchases"].first["product_name"]).to eq("Taters")
    end
  end

  describe "POST#create" do
    before(:each) do
      @post_json = {
        invoice_number: "1337",
        amount: "13.37",
        date_received: "05-01-2018",
        account_id: account,
        invoice_image: "<File:/var/folders/pp/bdccvc4x0_16_llbv4dvv7f80000gn/T/RackMultipart20180605-85518-1py7jyo.jpg>",
        purchases: "[{\"product_id\":\"123\",\"product_name\":\"123\",\"quantity\":\"123\",\"unit_price\":\"123\",\"total_price\":\"123.00\",\"key\":0}]"}
    end

    it "should create a new invoice" do

      prev_count = Invoice.count
      post(:create, format: JSON, params: @post_json)
      expect(Invoice.count).to eq(prev_count + 1)
    end

    it "should create a new invoice" do

      post(:create, format: JSON, params: @post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["invoice_number"]).to eq("1337")
    end

    it "should create the purchases associated with the invoice" do

      prev_count = Purchase.count
      post(:create, format: JSON, params: @post_json)
      expect(Purchase.count).to eq(prev_count + 1)
    end
  end

  describe "GET#date" do
    it "should return the invoices that occurred on a specific date" do

      get :date, params: { date: invoice.date_received }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json.first["purchases"]).to eq(nil)
    end
  end

  describe "GET#invoice_number" do
    it "should return the invoices that occurred on a specific date" do

      get :invoice_number, params: { invoice_number: invoice.invoice_number }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json.first["purchases"]).to eq(nil)
    end
  end
end
