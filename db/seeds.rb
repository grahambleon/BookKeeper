User.create!([
  {email: "grahamwithag@gmail.com", password: "dothack", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 29, current_sign_in_at: "2018-05-10 17:14:39", last_sign_in_at: "2018-05-10 16:22:25", current_sign_in_ip: "127.0.0.1", last_sign_in_ip: "127.0.0.1", business_name: "Sel de la Terre", address: "1245 Washington Street"}
])
Account.create!([
  {company_name: "Russo's", user_id: 1}
])
Invoice.create!([
  {invoice_number: "1337", amount: 200.00, date_received: "2/4/2017", account_id: 1, user_id: 1}
])
Purchase.create!([
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 1}
])
