import { Injectable, Module } from '@nestjs/common';

@Injectable()
export class LoggerService {}
const loggerAliasProvider = {
    provide: 'AliasedLoggerService',
    useExisting: LoggerService,
};
@Module({
  providers: [LoggerService, loggerAliasProvider],
})
export class AppModule {}
  