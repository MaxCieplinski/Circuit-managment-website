module.exports = {
  apps : [{
    name   : "server",
    script : "server.js",
    watch  : true,
    ignore_watch : ["err.log", "out.log"],
    error_file : "./err.log",
    out_file : "./out.log"
  }]
}
