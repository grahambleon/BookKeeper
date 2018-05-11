import React from 'react';
import { shallow, mount, render } from 'enzyme';
import HomePage from '../../../app/javascript/containers/home-page';

describe('<HomePage />', () => {
  fetch.mockResponseOnce(JSON.stringify(
    [
      {
        "id": 1,
        "company_name": "Russo's",
        "invoices": [
          {
            "id": 1,
            "invoice_number": "1448",
            "amount": "200.0",
            "date_received": "2/4/2017",
            "account_id": 1,
            "purchases": [
              {
                "id": 1,
                "product_id": "0293874",
                "product_name": "Taters",
                "quantity": "30 lbs",
                "unit_price": "3.00 per pound",
                "total_price": "90.0",
                "account_id": 1,
                "invoice_id": 1
              }
            ]
          }
        ]
      }
    ]), {status: 200})

  const wrapper = mount(
    <HomePage />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('issues a successful fetch call for user data and stores it in state', () => {
    expect(wrapper.state('userData')).toEqual(
      [
        {
          "id": 1,
          "company_name": "Russo's",
          "invoices": [
            {
              "id": 1,
              "invoice_number": "1448",
              "amount": "200.0",
              "date_received": "2/4/2017",
              "account_id": 1,
              "purchases": [
                {
                  "id": 1,
                  "product_id": "0293874",
                  "product_name": "Taters",
                  "quantity": "30 lbs",
                  "unit_price": "3.00 per pound",
                  "total_price": "90.0",
                  "account_id": 1,
                  "invoice_id": 1
                }
              ]
            }
          ]
        }
      ]
    )
  })
})
