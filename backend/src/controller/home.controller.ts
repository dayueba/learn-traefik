import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
const os = require('os');
import axios from 'axios';
import { context, trace } from '@opentelemetry/api';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    console.log(this.ctx.headers);
    const span = trace.getSpan(context.active());
    const spanContext = span?.spanContext();
    const traceId = spanContext?.traceId;
    await axios.get('https://www.baidu.com');
    return `Hello ${os.hostname} ${this.ctx.traceId} ${traceId}!`;
  }
}
