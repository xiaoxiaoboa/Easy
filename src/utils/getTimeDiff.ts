const getTimeDiff = (time: string) => {
  const getTime = new Date(time)
  const currTime = Date.now()
  const diff = currTime - getTime.getTime()

  const secondDiff = diff / 1000
  const minuteDiff = secondDiff / 60
  const hourDiff = minuteDiff / 60
  const dayDiff = hourDiff / 24
  const yearDiff = dayDiff / 365

  if (secondDiff < 60) {
    return Math.floor(secondDiff) + "秒前"
  } else if (minuteDiff < 60) {
    return Math.floor(minuteDiff) + "分钟前"
  } else if (hourDiff < 24) {
    return Math.floor(hourDiff) + "小时前"
  } else if (dayDiff < 365) {
    return Math.floor(dayDiff) + "天前"
  } else {
    return Math.floor(yearDiff) + "年前"
  }
}

export default getTimeDiff
