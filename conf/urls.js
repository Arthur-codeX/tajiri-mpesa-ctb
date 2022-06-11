const live_base_url = "https://api.safaricom.co.ke";
const sand_box_base_url = "https://sandbox.safaricom.co.ke";

const ctb_registerUrl = "mpesa/c2b/v1/registerurl";
const stk_query = "mpesa/stkpushquery/v1/query";

const live = {
  ctb_registerUrl: `${live_base_url}/${ctb_registerUrl}`,
  stkQuery: `${live_base_url}/${stk_query}`,
};

const sandbox = {
  stkPush: `${sand_box_base_url}/${ctb_registerUrl}`,
  stkQuery: `${sand_box_base_url}/${stk_query}`,
};

const urls = {
  live: live,
  sandbox: sandbox,
};

module.exports = urls;
