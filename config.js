var convict = require('convict');

// Define a schema
var config = convict({
  config: {
    doc: "User specified config file to merge with",
    format: String,
    default: "config.json",
    env: "CONFIG_FILE",
    arg: "config"
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
    arg: "ip"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port"
  },
  package: {
    doc: "Package to generate.",
    format: Object,
    default: {}
  }
})

// Load environment dependent configuration
const user = config.get('config')
if (user) {
  config.loadFile(user)
} else {
  console.error("No config file loaded!")
}

// Perform validation
config.validate({allowed: 'strict'})

module.exports = config
