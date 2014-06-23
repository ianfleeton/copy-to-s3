copy-to-s3
==========

A Node/Express microservice to copy files from an HTTP/HTTPS source to Amazon
S3.

Requests are POST'ed to `/` in JSON with the key `source`.

The file retrieved from `source` is then copied to the configured S3 bucket
with a name that matches the source.

## Development status

Incomplete and not ready for public consumption.
