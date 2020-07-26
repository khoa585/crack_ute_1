let rq = require("request-promise");
let tough = require('tough-cookie');
const cheerio = require('cheerio');
var Cookie = tough.Cookie;
const URLPatch = "http://daotao.ute.udn.vn"
class Api {
  constructor() {
    this.jar = rq.jar();
    rq = rq.defaults({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
  }
  getSCORES = async (cookie) => {
    return new Promise(async (resolve, reject) => {
      const option = await this.options({
        URLPatc: '/svtranscript.asp',
        method: "get",
        cookie: cookie
      })
      const table = option("#pagemain > table:nth-child(6) > tbody > tr > td > table > tbody > tr:not(:first-child)")
      const result = []
      table.map(function () {
        let Coursecode = option(this).children("td:nth-child(1)").text()
        let classcode = option(this).children("td:nth-child(2)").text()
        let Modulename = option(this).children("td:nth-child(3)").text()
        let creditnumber = option(this).children("td:nth-child(4)").text()
        let DTK = option(this).children("td:nth-child(5)").text()
        let Diemchu = option(this).children("td:nth-child(5)").text()
        let Hocki = option(this).children("td:nth-child(5)").text()
        let Accumulation = option(this).children("td:nth-child(5)").text()
        result.push({
          Coursecode,
          classcode,
          Modulename,
          creditnumber,
          DTK,
          Diemchu,
          Hocki,
          Accumulation
        })
      })
      resolve(result)
    })
  }
  getSchedule = async (cookie) => {
    return new Promise(async (resolve, reject) => {
      const option = await this.options({
        URLPatc: `${'/svtkb.asp?masv=' + 1811505310219}`,
        method: "get",
        cookie: cookie
      })
      const result = []
      let table = option("#inner-column-container > div:nth-child(2) > table > tbody>tr:not(:first-child)");
      table.map(function () {
        let name = option(this).children("td:nth-child(1)").text();
        let momhoc = option(this).children("td:nth-child(2)").text();
        let Thu = option(this).children("td:nth-child(3)").text();
        let from = option(this).children("td:nth-child(4)").text();
        let to = option(this).children("td:nth-child(5)").text();
        let giangvien = option(this).children("td:nth-child(6)").text();
        result.push({
          name,
          momhoc,
          Thu,
          from,
          to,
          giangvien
        })
      })
      resolve(result)

    })
  }
  Login = async ({ usename, password }) => {
    return new Promise(async (resolve, reject) => {
      const option = await this.options({
        formData: {
          'maSV': usename,
          'pw': password
        },
        URLPatc: "/svlogin.asp",
        method: "post"
      })
      const name = option('#content #inner-column-container table tbody tr #pagemain').text()
      if (name.length) resolve(this.jar)
      reject('Forgot user or pass');
    })
  }
  options(data = { formData: '', URLPatc, method: 'post', cookie: '' }) {
    const form = {
      method: data.method,
      uri: URLPatch + data.URLPatc,
      jar: this.jar,
      resolveWithFullResponse: true,
      followAllRedirects: true,
      form: data.formData,
      headers: {
        'cookie': data.cookie
      }
    }
    console.log(form)
    form.transform = body => cheerio.load(body);
    return rq(form)
  }
}
module.exports = new Api();

















