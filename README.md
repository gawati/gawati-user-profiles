#install npm modules and update port in variables.env

#Install latest version of mongodb

#Change the database in the variables.env

#Update the AWS S3 credentails in the variables.env

#Update the FILESYSTEM_ROOT(root location of image upload directory - don't forget trailing slash eg. /var/www/html/) in the variables.env

#Update the FILESYSTEM_UPLOAD_DIRECTORY(name of the folder to save the images-create the folder as well) in the variables.env

#Add the following in the apache config
<Location ~ "/gwu/(.*)">
  AddType text/cache-manifest .appcache
  ProxyPassMatch  "http://localhost:$port/gwu/$1"
  ProxyPassReverse "http://localhost:$port/gwu/$1"
  SetEnv force-proxy-request-1.0 1
  SetEnv proxy-nokeepalive 1
</Location>

