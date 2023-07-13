// 处理签到

export default async function signIn(session, next) {
  console.log('%c [ session ]-4', 'font-size:13px; background:pink; color:#bf2c9f;', JSON.stringify(session))

  const user = await session.getUser(session.userId)

  console.log('[ user ] >', user)

  return next()

}
