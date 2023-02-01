
const { Signale } = require('signale');

const options = {
  disabled: false,
  interactive: false,
  logLevel: 'info',
  scope: '',
  secrets: [],
  stream: process.stdout,
  types: {
    success: {
      badge: '✔️',
      color: 'yellow',
      label: '',
      logLevel: 'info'
    },
    error : {
      badge: '❗️',
      color: 'red',
      label: '',
      logLevel: 'error'
    },
    http : {
      badge: '📡',
      color: 'gray',
      label: '',
      logLevel: 'info'
    }
  }
};

const custom = new Signale(options);

module.exports = { custom }