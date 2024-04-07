const formatter = (type = 'info', message = '', options = {}) => {
  const { style = 'html', bold = false, wordWrap = false } = options

  if (bold && type === 'info') {
    style === 'html' && (message = message.replace(/\+?\d+/g, ' <b>$&</b> '))
    style === 'markdown' && (message = message.replace(/\+?\d+/g, ' **$&** '))
  }

  if (wordWrap) {
    style === 'markdown' && (message = message.replace(/\n/g, ' \n\n > ').replace(/ +/g, ' '))
  }

  return {
    title: `签到${type === 'info' ? '成功 🎉' : '失败 💣'}`,
    content: style === 'html' ? `<pre>${message}</pre>` : message,
  }
}

module.exports = formatter