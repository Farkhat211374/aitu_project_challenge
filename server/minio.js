var Minio = require('minio')

// Instantiate the minio client with the endpoint
// and access keys as shown below.
var minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'Y8mY842Nen6Q2tVY2m1D',
  secretKey: 'yG3JGTyBM8Mtykn53qaoqDlqymTK87RitqorZmUO',
})

// File that needs to be uploaded.
var file = 'pinguin.png'

// Make a bucket called europetrip.
minioClient.makeBucket('new', 'us-east-1', function (err) {
  if (err) return console.log(err)

  console.log('Bucket created successfully in "us-east-1".')

  var metaData = {
    'Content-Type': 'application/octet-stream',
    'X-Amz-Meta-Testing': 1234,
    example: 5678,
  }
  // Using fPutObject API upload your file to the bucket europetrip.
  minioClient.fPutObject('new', 'pinguin.png', file, metaData, function (err, etag) {
    if (err) return console.log(err)
    console.log('File uploaded successfully.')
  })
})