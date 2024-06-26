const axios = require('axios')
const { url, Cookie } = require('../config/index.js')
const email = require('../utils/email.js')
const formatter = require('../utils/format.js')

const signIn = async () => {
  const res = await axios.post(
    url.sign_in,
    {},
    {
      headers: {
        Cookie
      }
    }
  )
  if (res && res.data) {
    let message = ''
    let type = 'info'
    if (res.data.err_no === 0 && res.data.data && res.data.data.incr_point) {
      message = `掘金签到结果,获得: ${res.data.data.incr_point} 矿石`
      console.log(`掘金签到结果,获得: ${res.data.data.incr_point} 矿石`)
      setTimeout(() => {
        lotteryFreeCheck();
      }, Math.random() * 5 * 1000)
    } else {
      let msg = ''
      if (res.data.data) {
        msg = res.data.data.err_msg
      } else {
        msg = res.data.err_msg
      }
      console.log(`掘金签到结果`, { '签到失败': msg });
      type = 'error'
      message = `掘金签到结果,失败: ${msg}`
    }
    email(
      formatter(type, message, {
        style: 'html',
        bold: true,
      })
    )
  }
}

const lotteryFreeCheck = async () => {
  const res = await axios.get(
    url.free_count,
    {
      headers: {
        Cookie
      }
    }
  );
  if (res && res.data) {
    if (res.data.data.free_count > 0) {
      lotteryDraw();
    }
  }
}

const lotteryDraw = async () => {
  const res = await axios.post(
    url.lottery,
    {},
    {
      headers: {
        Cookie
      }
    }
  );
  let message = ''
  let type = 'info'
  if (res && res.data) {
    console.log(`抽奖成功，获得：${res.data.data.lottery_name}`);
    message = `抽奖成功，获得：${res.data.data.lottery_name}`
  } else {
    console.log(res);
    console.log(`抽奖失败`);
    message = `抽奖失败`
  }
  email(
    formatter(type, message, {
      style: 'html',
      bold: true,
    })
  )
}

signIn()