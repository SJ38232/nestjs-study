import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpExcepitonFilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
