
const winston = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = winston.format;

// let alignColorsAndTime = winston.format.combine(
//   winston.format.colorize({
//       all:true
//   }),
//   winston.format.label({
//       label:'[LOGGER]'
//   }),
//   winston.format.timestamp({
//       format:"YY-MM-DD HH:mm:ss"
//   }),
//   winston.format.printf(
//       info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
//   )
// );

//  const customLevels = {
//     levels: {
//       error: 0,
//       warn: 1,
//       info: 2,
//       debug: 3,
//       all: 4,
//     },
//     colors: {
//       error: "red",
//       warn: "yellow",
//       info: "green",
//       debug: "grey",
//       all: "white",
//     },
//   };

const format = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});


const logger = winston.createLogger({
  level: "debug",
  format: combine(
    winston.format.colorize(),
    label({ label: 'right meow!' }),
    timestamp(),
    format,
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
  ]
});



module.exports = logger


//transports: [
  //     new (winston.transports.Console)({
  //     format: winston.format.combine(winston.format.colorize(), alignColorsAndTime)
  //     }),

  //     new winston.transports.Console({
  //     level: "info",
  //     format: winston.format.combine(winston.format.colorize(), alignColorsAndTime)
  //         }), 

  //     new winston.transports.Console({
  //     level: "error",
  //     format: winston.format.combine(winston.format.colorize(), alignColorsAndTime)
  //     }),
      
  //     new winston.transports.Console({
  //       level: "http",
  //       format: winston.format.combine(winston.format.colorize(), alignColorsAndTime)
  //       }),
  //       new winston.transports.Console({
  //         level: "warn",
  //         format: winston.format.combine(winston.format.colorize(), alignColorsAndTime)
  //         })
  // ],