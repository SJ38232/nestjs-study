import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CatsModule } from './week1/cats/cats.module';
import { RolesGuard } from './week1/guard/roles.guard';
import { LoggingInterceptor } from './week1/interceptor/logging.interceptor';
import { LoggerMiddleware } from './week1/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
