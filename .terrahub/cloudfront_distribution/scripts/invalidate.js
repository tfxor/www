const AWS = require('aws-sdk')

const cloudfront = new AWS.CloudFront()
const s3 = new AWS.S3()
const {
  THUB_CLOUDFRONT_DOMAIN_NAME: domainName,
  THUB_S3_INDEX_KEY_CLOUDFRONT: cloudfrontIndex,
  THUB_S3_INDEX_KEY_WEBSITE: websiteIndex,
  THUB_S3_BUCKET_NAME: bucketName
} = process.env

function getDistributions () {
  let marker
  const result = []
  const commonParams = {
    MaxItems: '10'
  }

  return new Promise(resolve => {
    const listDistributions = () => {
      const params = marker ? Object.assign(commonParams, { Marker: marker }) : commonParams
      let isTruncated, items

      cloudfront.listDistributions(params).promise().then(data => {
        const distributionList = data.DistributionList;

        ({
          NextMarker: marker,
          IsTruncated: isTruncated,
          Items: items
        } = distributionList)

        result.push(...items)

        if (isTruncated) {
          listDistributions()
        }

        resolve(result)
      })
    }
    listDistributions()
  })
}

function invalidateCloudfront (id) {
  const params = {
    DistributionId: id,
    InvalidationBatch: {
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: 1,
        Items: ['/*']
      }
    }
  }

  return new Promise(((resolve, reject) => {
    cloudfront.createInvalidation(params).promise().then(res => {
      resolve({ message: 'Invalidation created successfully', data: res })
    }).catch(err => {
      reject({ message: 'Invalidation could not be created successfully', data: err })
    })
  }))
}

function retrieveFileContent (bucket, key) {
  const params = {
    Bucket: bucket,
    Key: key
  }

  return new Promise(resolve => {
    s3.getObject(params).promise().then(data => {
      resolve(data.Body.toString())
    }).catch(() => {
      resolve(false)
    })
  })
}

function writeFileContent (bucket, key, body) {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: Buffer.from(body, 'utf-8')
  }

  s3.putObject(params).promise().catch(() => {
    console.error(`ERROR: Unable to update ${key}... Aborting`)
    process.exit()
  })
}

function executeTrigger () {
  console.log('INFO: Checking if CloudFront distribution exists')

  getDistributions().then(data => {
    return data.filter(it => it.Origins.Items.some(origin => origin.DomainName === domainName))
  }).then(res => {
    if (res.length === 0) {
      console.error('ERROR: No CloudFront distribution was found... Aborting')

      process.exit()
    } else {
      console.log('INFO: CloudFront distribution was found')

      invalidateCloudfront(res[0].Id).then(console.log).catch(console.error)
      retrieveFileContent(bucketName, websiteIndex).then(buildHash => {
        writeFileContent(bucketName, cloudfrontIndex, buildHash)
      })
    }
  })
}

retrieveFileContent(bucketName, cloudfrontIndex).then(content => {
  if (content === false) {
    console.log('INFO: CloudFront index file does not exist => Cache invalidation required')
    executeTrigger()
  } else {
    retrieveFileContent(bucketName, websiteIndex).then(buildHash => {
      console.log(`INFO: Build SHA256 => ${buildHash}`)
      console.log(`INFO: CloudFront SHA256 => ${content}`)

      if (buildHash === content) {
        console.log('INFO: Cache invalidation is not required')
      } else {
        console.log('INFO: Cache invalidation is required')
        executeTrigger()
      }
    })
  }
})
