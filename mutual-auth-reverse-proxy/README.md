### Mutual Authentication Reverse Proxy Server

This example demonstrates a reverse proxy with mutual authentication enforced.  
the reverse-proxy server contains a self-signed cert and key that is used to 
authenticate and identify a user who contains a cert signed with the same key.  
The CN of the certificate is used to identify the user.

A user without a valid certificate will be rejected at the reverse-proxy and 
cannot access the underlying servers.

This example uses: 
- Docker-compose
- Nodejs
- Express
- Https
- Http-proxy

### Build & Run

```
   $ docker-compose build
   $ docker-compose up -d
```

### Setting up the certificate

In order for the server to authenticate the user, a certificate must be signed 
by the server and loaded into the user's browser.

Create a user key and certificate signing request (CSR)
```
$ openssl req -newkey rsa:4096 -keyout user_key.pem -out user_csr.pem -nodes 
-days 365 -subj "/CN=User"
```

Sign the user's certificate with the server key
```
$ openssl x509 -req -in user_csr.pem -CA server_cert.pem -CAkey server_key.pem 
-out user_cert.pem -set_serial 01 -days 365
```

Bundle the user's key and cert using pkcs12
```
$ openssl pkcs12 -export -clcerts -in user_cert.pem -inkey user_key.pem -out 
user.p12
```

Add the p12 file to your browser. In Chrome, go to Settings > Advanced > Manage 
Certificates > Your Certificates. Click "Import" and add the p12 file what was 
just created.

The user now has a certificate signed by the server that the server can use to 
authenticate and identify the user. 

