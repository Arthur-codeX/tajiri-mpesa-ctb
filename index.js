const mtoken = require("tajiri-mpesa-oauth");
const password = require("tajiri-mpesa-password");
const axios = require("axios");
const urls = require("./conf/urls");

const environment = "live";
const conf = {
  BUSINESS_SHORT_CODE: 4086099,
  TRANSACTION_TYPE: "CustomerPayBillOnline",
  AMOUNT: 1,
  PHONE_NUMBER: 254728829146,
  CALLBACK_URL: "https://dev.api.mazimobility.xyz/api/reward/express/call/back",
  CTB_CONFIRMATION_URL: "https://dev.api.mazimobility.xyz/api/reward/ctb",
  ACCOUNT_REFERENCE: "MAZI LIMITED",
  TRANSACTION_DESCRIPTION: "Payment of some thing",
  CONSUMER_KEY: "4ez6GZHXvXfgOjNa9EXYE1YWXl3F7JnH",
  CONSUMER_SECRET: "kKo1sqMjUvxvPPdj",
  PASS_KEY: "3b235df4d639723b8fae83ea746ee89908f2c33c12780674b47f10347d7da739",
  RESPONSE_TYPE: "Completed",
};

class Ctb {
  constructor(
    conf,
    environment = "sandbox",
    token_auth_type = "Basic",
    auth_type = "Bearer"
  ) {
    this.conf = conf;
    this.environment = environment;
    this.token_auth_type = token_auth_type;
    this.auth_type = auth_type;
    this.ctb_registerUrl = urls[environment].ctb_registerUrl;
  }

  register_url_payload = (
    Response_Type = null,
    confirmation_url = null,
    validation_url = null
  ) => {
    if (Response_Type === null) {
      Response_Type = this.conf.RESPONSE_TYPE;
    }

    if (confirmation_url === null) {
      confirmation_url = this.conf.CTB_CONFIRMATION_URL;
    }

    if (validation_url === null) {
      validation_url = this.conf.CTB_VALIDATION_URL;
    }

    return {
      ShortCode: this.conf.BUSINESS_SHORT_CODE,
      ResponseType: Response_Type,
      ConfirmationURL: confirmation_url,
      ValidationURL: validation_url,
    };
  };

  register_url = async (
    Response_Type = null,
    confirmation_url = "https://mydomain.com/confirmation",
    validation_url = "https://mydomain.com/validation"
  ) => {
    if (Response_Type === null) {
      Response_Type = this.conf.RESPONSE_TYPE;
    }
    let token = await mtoken(this.conf, this.environment, this.token_auth_type);

    let payload = this.register_url_payload(
      Response_Type,
      confirmation_url,
      validation_url
    );

    let res = await axios({
      method: "POST",
      headers: {
        Authorization: `${this.auth_type} ${token.access_token}`,
      },
      data: payload,
      url: this.ctb_registerUrl,
    });
    return res.data;
  };
}

module.exports = mpesaCtb;
