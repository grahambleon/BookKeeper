User.create!([
  {email: "demo@gemail.com", password: "password", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 29, current_sign_in_at: "2018-05-10 17:14:39", last_sign_in_at: "2018-05-10 16:22:25", current_sign_in_ip: "127.0.0.1", last_sign_in_ip: "127.0.0.1", business_name: "The Frogmore Low Country Kitchen & Bar", address: "365 Centre St, Jamaica Plain, MA 02130"}
])
Account.create!([
  {company_name: "Russo's", user_id: 1},
  {company_name: "Paul Marks", user_id: 1}
])
Invoice.create!([
  {invoice_number: "1337", amount: 200.00, date_received: "2/4/2017", account_id: 1, user_id: 1},
  {invoice_number: "1337", amount: 200.00, date_received: "2/4/2017", account_id: 2, user_id: 1}

])
Purchase.create!([
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 1},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 1},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 1},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 1},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 1},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 2},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 2},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 2},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 2},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 2},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 2},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 2},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 2},
  {product_id: "0293874", product_name: "Taters", quantity: "30 lbs", unit_price: "3.00 per pound", total_price: 90.00, user_id: 1, account_id: 1, invoice_id: 2}
])
