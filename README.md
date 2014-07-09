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
with a name that matches the source with the URI scheme removed. For example,
`http://example.org/myfile` will be uploaded with the key
`example.org/myfile`.

Settings must be provided in the following environment variables:

* `COPY_TO_S3_AWS_API_KEY` - AWS API key
* `COPY_TO_S3_AWS_SECRET` - AWS secret 
* `COPY_TO_S3_AWS_BUCKET` - S3 bucket to which to upload the file
* `COPY_TO_S3_PORT="3002` - Port on which the server runs

The service provides no authentication. It should only be used within a
trusted environment.

## Development status

Incomplete and not ready for public consumption.
