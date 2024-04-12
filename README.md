# traefik 学习


遇到的问题
1. 链路追踪，是用thift协议的数据

Jaeger追踪系统使用自定义的uber-trace-id头部来传递追踪信息。uber-trace-id的格式如下：
`uber-trace-id: {trace-id}:{span-id}:{parent-span-id}:{flags}`

在OpenTelemetry 协议中，traceid 的传递遵循 W3C Trace Context 标准，其具体格式在 traceparent 头部定义。traceparent 头部规定了分布式追踪系统中 traceid 的传递方式，其格式如下：
`traceparent: version-traceid-parentid-flags`

需要自己想办法兼容，否则无法根据traceid 关联。