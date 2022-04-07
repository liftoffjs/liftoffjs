import { WinstonModule } from 'nest-winston';
import { ConsoleLoggingConfig, FileLoggingConfig, LiftoffConfig } from '../common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const colors = {
  log: 'dim green',
  info: 'green',
  warn: 'bold yellow',
  error: 'bold red',
  debug: 'dim green',
};

const timestampFormat = () => winston.format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS', });
const printF = (preformat?: (info: winston.Logform.TransformableInfo) => winston.Logform.TransformableInfo) => {
  return winston.format.printf(
    (info) => {
      info.label = `[Liftoff]`;
      info.context = `[${info.context ?? "Application"}]`;
      info.timestamp = `[${info.timestamp}]`;
      Object.keys(colors).forEach(color => {
        if (info.level.includes(color)) {
          info.level = info.level.replace(color, `[${color.toLocaleUpperCase()}]`);
        }
      });

      info = preformat ? preformat(info) : info;
      return [
        // info.label,
        info.timestamp,
        info.context,
        `${info.level}:`,
        typeof info.message === "string" ? info.message : JSON.stringify(info.message)
      ].filter(x => x?.length).join(" ");
    }
  );
}

function createConsoleLogger(config: ConsoleLoggingConfig) {
  const format: winston.Logform.Format[] = [timestampFormat()];
  if (config.colors) {
    format.push(winston.format.colorize({
      all: true,
      colors,
    }));
    format.push(
      printF((info) => {
        info.label = `\x1b[36m\x1b[2m${info.label}\x1b[0m`;
        info.context = `\x1b[36m${info.context ?? "Root"}\x1b[0m`;
        info.timestamp = `\x1b[2m${info.timestamp}\x1b[0m`;
        return info;
      }));
  } else {
    format.push(printF());
  }
  return new winston.transports.Console({
    silent: false,
    format: winston.format.combine(...format)
  });
}

function createFileLogger(config: FileLoggingConfig) {
  return new (winston.transports as any).DailyRotateFile({
    silent: false,
    level: "debug",
    format: winston.format.combine(
      timestampFormat(),
      printF(),
    ),
    filename: `${config.rootPath}/application-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  })
}

function getDriver(config: LiftoffConfig, driver: FileLoggingConfig["driver"] | ConsoleLoggingConfig["driver"]) {
  return config.logging.drivers?.find(d => d.driver === driver);
}

export function createLiftoffLogger(config: LiftoffConfig) {
  const transports: winston.transport[] = [];

  const consoleDriverConfig = getDriver(config, "console");
  if (consoleDriverConfig) {
    transports.push(createConsoleLogger(consoleDriverConfig as ConsoleLoggingConfig));
  }

  const fileDriverConfig = getDriver(config, "file");
  if (fileDriverConfig) {
    transports.push(createFileLogger(fileDriverConfig as FileLoggingConfig));
  }

  return WinstonModule.createLogger({
    level: "debug",
    transports
  });
}
