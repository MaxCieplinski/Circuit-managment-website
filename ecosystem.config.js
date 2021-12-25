module.exports = {
  apps : [{
    name   : "server",
    script : "./server.js",
    watch  : ["server.js", "ecosystem.config.js", "package.json"],
    ignore_watch : ["node_modules", "package.json", "package-lock.json"],
    error_file : "./err.log",
    out_file : "./out.log"
  }]
}
