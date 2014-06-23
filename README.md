copy-to-s3
==========

A Node/Express microservice to copy files from an HTTP/HTTPS source to Amazon
S3.

Requests are POST'ed to `/` in JSON with the key `source`.

Example with the service running on port 3002 on localhost:

```
curl -H "Content-Type: application/json" \
     -d '{"source":"http://example.org/myfile"}' \
     -X POST 'http://localhost:3002/'
```

The file retrieved from `source` is then copied to the configured S3 bucket
with a name that matches the source.

## Development status

Incomplete and not ready for public consumption.
