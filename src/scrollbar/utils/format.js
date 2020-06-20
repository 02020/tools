


function formatPercentage (percent, num = 2) {
  if (!isNaN(percent)) {
      return (percent * 100).toFixed(num) + '%';
  } else {
      return '-';
  }
}

function formatThousandPoint (number) {
  let num = String(number);
  return num.replace(/(\d{1,3})(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
  });
}


function formatDate1 (date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month < 10 && (month = '0' + month);
  day < 10 && (day = '0' + day);

  return year + '-' + month + '-' + day;
}

// 时间格式化
 const formatDate = (date, fmt) => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}


export {
  formatDate,
  formatPercentage,
  formatThousandPoint
}