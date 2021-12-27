import axios from "axios";

axios({
  url: "https://gw.datayes-stg.com/ams_monitor_qa/web/industry/prosperity/comparison-chart/data?industryIds=01030309,01030322",
  method: "GET",
  headers: {
    cookie: "cloud-sso-token=5F742D527B63FD5DD8E292BECF6AA9BA",
  },
  // headers: {
  //   host: "localhost:4000",
  //   connection: "keep-alive",
  //   "sec-ch-ua":
  //     '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
  //   pragma: "no-cache",
  //   "accept-language": "zh",
  //   "sec-ch-ua-mobile": "?0",
  //   "user-agent":
  //     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
  //   accept: "application/json, text/plain, */*",
  //   "cache-control": "no-cache",
  //   "sec-ch-ua-platform": '"macOS"',
  //   origin: "http://roboams-ci.respool2.wmcloud-qa.com",
  //   "sec-fetch-site": "cross-site",
  //   "sec-fetch-mode": "cors",
  //   "sec-fetch-dest": "empty",
  //   referer: "http://roboams-ci.respool2.wmcloud-qa.com/",
  //   "accept-encoding": "gzip, deflate, br",
  //   Host: "wmcloud-stg.com",
  // },
})
  .then((res) => {
    console.log("SUCCESS=>", res.data);
  })
  .catch((err) => {
    console.log(err.message);
  });
