console.log('Module.js')

async function start() {
  return await Promise.resolve('async working by using polyfill')
}

start().then(console.log)
