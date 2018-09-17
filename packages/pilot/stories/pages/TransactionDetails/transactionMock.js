/* eslint-disable */
import moment from 'moment'

const transaction = {
  "acquirer": {
    "name": "pagarme",
    "response_code": "0000",
    "sequence_number": 3082517,
    "transaction_id": 3082517
  },
  "amount": 985172498,
  "antifraud": null,
  "boleto": null,
  "capabilities": {
    "capturable": true,
    "refundable": true,
    "reprocessable": true,
  },
  "card": {
    "brand_name": "visa",
    "first_digits": "411111",
    "holder_name": "João Noleto",
    "international": true,
    "last_digits": "1111",
    "pin_mode": null
  },
  "customer": {
    "birth_date": "1999-01-01",
    "country": "us",
    "document_number": null,
    "document_type": "cpf",
    "email": "joaonoleto@gmail.com",
    "name": "Lalala",
    "phones": [
      "+5599993333"
    ]
  },
  "created_at": "2018-03-14T13:40:28.465Z",
  "external_id": null,
  "id": 3082517,
  "metadata": {
    "card": {
      "brand_name": "visa",
      "first_digits": "411111",
      "holder_name": "João Noleto",
      "international": true,
      "last_digits": "1111",
      "pin_mode": null
    },
  },
  "nextId": 67890,
  "operations": [
    {
      "cycle": 1,
      "date_created": "2016-01-14T16:07:16.000Z",
      "status": "success",
      "type": "chargeback",
    },
    {
      "cycle": 1,
      "date_created": "2017-01-14T16:07:16.000Z",
      "status": "success",
      "type": "chargeback_refund",
    },
    {
      "date_created": "2018-03-14T13:40:28.564Z",
      "id": "go_cjer4v5045rae493sgz2fnv0s",
      "status": "success",
      "type": "capture",
    },
    {
      "created_at": "2018-03-14T13:40:28.579Z",
      "cycle": null,
      "id": "go_cjhat6u2e0bje5y3tcngama5p",
      "status": "approved",
      "type": "manual_review"
    },
    {
      "created_at": "2018-03-14T13:40:28.579Z",
      "cycle": null,
      "id": "go_cjhat6u2e0bje5y3tcngama5q",
      "status": "refused",
      "type": "analyze"
    },
    {
      "id": "go_cjer4v50j5rag493sjr317z7v",
      "date_created": "2018-03-14T13:40:28.579Z",
      "id": "go_cjer4v50j5rag493sjr317z7v",
      "status": "success",
      "type": "authorize",
    }
  ],
  "payment": {
    "cost_amount": 0,
    "installments": 12,
    "method": "credit_card",
    "net_amount": 985172498,
    "paid_amount": 985172498,
    "refund_amount": 0,
  },
  "previousId": 12345,
  "recipients": [
    {
      "name": "JONATHAN LIMA",
      "amount": 394068999,
      "installments": [
        {
          "amount": 32839075,
          "costs": {
            "anticipation": 0,
            "mdr": 3283901,
          },
          "date_created": moment("2018-03-14T13:40:28.948Z"),
          "net_amount": 29555174,
          "number": 1,
          "original_payment_date": null,
          "payment_date": moment("2018-04-16T03:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0,
          },
          "date_created": moment("2018-03-14T13:40:28.949Z"),
          "net_amount": 29555175,
          "number": 2,
          "original_payment_date": null,
          "payment_date": moment("2018-05-15T03:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.949Z"),
          "net_amount": 29555175,
          "number": 3,
          "original_payment_date": null,
          "payment_date": moment("2018-06-13T03:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.949Z"),
          "net_amount": 29555175,
          "number": 4,
          "original_payment_date": null,
          "payment_date": moment("2018-07-13T03:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.950Z"),
          "net_amount": 29555175,
          "number": 5,
          "original_payment_date": null,
          "payment_date": moment("2018-08-14T03:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.950Z"),
          "net_amount": 29555175,
          "number": 6,
          "original_payment_date": null,
          "payment_date": moment("2018-09-11T03:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.951Z"),
          "net_amount": 29555175,
          "number": 7,
          "original_payment_date": null,
          "payment_date": moment("2018-10-11T03:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.951Z"),
          "net_amount": 29555175,
          "number": 8,
          "original_payment_date": null,
          "payment_date": moment("2018-11-12T02:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.951Z"),
          "net_amount": 29555175,
          "number": 9,
          "original_payment_date": null,
          "payment_date": moment("2018-12-11T02:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.958Z"),
          "net_amount": 29555175,
          "number": 10,
          "original_payment_date": null,
          "payment_date": moment("2019-01-09T02:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.958Z"),
          "net_amount": 29555175,
          "number": 11,
          "original_payment_date": null,
          "payment_date": moment("2019-02-08T02:00:00.000Z"),
        },
        {
          "amount": 32839084,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.959Z"),
          "net_amount": 29555175,
          "number": 12,
          "original_payment_date": null,
          "payment_date": moment("2019-03-12T03:00:00.000Z"),
        }
      ],
      "liabilities": [
        "mdr"
      ],
      "net_amount": 354662099,
      "status": "cancelled",
    },
    {
      "amount": -394069000,
      "installments": [
        {
          "amount": -32839076,
          "costs": {
            "mdr": -3283901,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:52.402Z"),
          "net_amount": -29555175,
          "number": 1,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:52.511Z"),
          "net_amount": -29555175,
          "number": 2,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:52.611Z"),
          "net_amount": -29555175,
          "number": 3,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:52.710Z"),
          "net_amount": -29555175,
          "number": 4,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:52.770Z"),
          "net_amount": -29555175,
          "number": 5,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:52.826Z"),
          "net_amount": -29555175,
          "number": 6,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:52.881Z"),
          "net_amount": -29555175,
          "number": 7,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:52.952Z"),
          "net_amount": -29555175,
          "number": 8,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:53.003Z"),
          "net_amount": -29555175,
          "number": 9,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:53.045Z"),
          "net_amount": -29555175,
          "number": 10,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:53.086Z"),
          "net_amount": -29555175,
          "number": 11,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        },
        {
          "amount": -32839084,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T16:11:53.121Z"),
          "net_amount": -29555175,
          "number": 12,
          "original_payment_date": null,
          "payment_date": moment("2018-03-14T03:00:00.000Z")
        }
      ],
      "liabilities": [
        "chargeback"
      ],
      "name": "JONATHAN LIMA",
      "net_amount": -354662100,
      "status": "cancelled",
    },
    {
      "name": "Marceneiro",
      "amount": 295551750,
      "net_amount": 295551750,
      "liabilities": [],
      "installments": [
        {
          "amount": 24629307,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.939Z"),
          "net_amount": 24629307,
          "number": 1,
          "original_payment_date": null,
          "payment_date": moment("2018-04-16T03:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.940Z"),
          "net_amount": 24629313,
          "number": 2,
          "original_payment_date": null,
          "payment_date": moment("2018-05-15T03:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.940Z"),
          "net_amount": 24629313,
          "number": 3,
          "original_payment_date": null,
          "payment_date": moment("2018-06-13T03:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.940Z"),
          "net_amount": 24629313,
          "number": 4,
          "original_payment_date": null,
          "payment_date": moment("2018-07-13T03:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.941Z"),
          "net_amount": 24629313,
          "number": 5,
          "original_payment_date": null,
          "payment_date": moment("2018-08-14T03:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.941Z"),
          "net_amount": 24629313,
          "number": 6,
          "original_payment_date": null,
          "payment_date": moment("2018-09-11T03:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.942Z"),
          "net_amount": 24629313,
          "number": 7,
          "original_payment_date": null,
          "payment_date": moment("2018-10-11T03:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.942Z"),
          "net_amount": 24629313,
          "number": 8,
          "original_payment_date": null,
          "payment_date": moment("2018-11-12T02:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.942Z"),
          "net_amount": 24629313,
          "number": 9,
          "original_payment_date": null,
          "payment_date": moment("2018-12-11T02:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.943Z"),
          "net_amount": 24629313,
          "number": 10,
          "original_payment_date": null,
          "payment_date": moment("2019-01-09T02:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.943Z"),
          "net_amount": 24629313,
          "number": 11,
          "original_payment_date": null,
          "payment_date": moment("2019-02-08T02:00:00.000Z")
        },
        {
          "amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          },
          "date_created": moment("2018-03-14T13:40:28.943Z"),
          "net_amount": 24629313,
          "number": 12,
          "original_payment_date": null,
          "payment_date": moment("2019-03-12T03:00:00.000Z")
        }
      ],
      "status": "cancelled",
    }
  ],
  "risk_level": "moderated",
  "soft_descriptor": null,
  "status_reason": "acquirer",
  "status": "chargedback",
  "updated_at": "2018-03-14T16:11:52.057Z",
}


export default transaction
