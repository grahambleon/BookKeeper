import React from 'react';
import InvoiceTile from '../components/invoice-tile'

const InvoiceList = (props) => {

  let invoices;
  invoices = props.invoices.map((invoice) => {
    return (
      <InvoiceTile
        key={invoice.id}
        purchases={invoice.purchases}
        invoice_number={invoice.invoice_number}
        date={invoice.date_received}
        amount={invoice.amount}
      />
    )
  })

  return (
    <div>{invoices}</div>
  )
}

export default InvoiceList;
