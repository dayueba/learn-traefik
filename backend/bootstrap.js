const opentelemetry = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-http');
const {
  OTLPMetricExporter,
} = require('@opentelemetry/exporter-metrics-otlp-http');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const {
  SEMRESATTRS_SERVICE_NAME,
} = require('@opentelemetry/semantic-conventions');

const sdk = new opentelemetry.NodeSDK({
  resource: new opentelemetry.resources.Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'backend',
  }),
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: 'http://jaeger:4318/v1/traces',
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }),
//   metricReader: new PeriodicExportingMetricReader({
//     exporter: new OTLPMetricExporter({
//       // url: '<your-otlp-endpoint>/v1/metrics', // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
//       url: 'http://otel-collector:4318/v1/traces',
//       headers: {}, // an optional object containing custom headers to be sent with each request
//       concurrencyLimit: 1, // an optional limit on pending requests
//     }),
//   }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch(error => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap.run();
