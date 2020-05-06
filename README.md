# Google Sheets Secrets Github Action

Setup github actions env masked vars like secrets using google sheets.

## Usage

```yaml
steps:
 - name: Store ENV secrets from some google spreadsheet document as source
   uses: dibenlloch/google-sheets-secrets-action@v1.0.1
   with:
     auth-client-email: ${{ secrets.SERVICE_EMAIL }}
     auth-private-key: ${{ secrets.SERVICE_KEY }}
     spreadsheet: ${{ secrets.SPREADSHEET_ID }}
     sheet: ${{ secrets.SHEET_TAB }} # optional sheet tab. If not seted will use first one
```
## Functionality

Given google sheets document this action will iterate over A and B columns using it as env-value dictionary. 
It's also possible to use tabs using `sheet` option to indicate which needs to use, useful setup different environments like DEV, STG, etc...  using same env vars.

## Limitations

Env vars are only available in job same job as invoked action. If you workflow has multiple jobs, needs to be called for each job that needs this env vars.

## How to configure

First of all you need to setup google service account.
* Login google api console
* On library enable `Google Sheets API`
* On credentials section `create service account`  (there is no need of special rol)
* Download json credentials file generated at previous step and use client_email and private_key for setup google sheets action.
* Go to google spreadsheet that you want to use and share it with generated email at service account (same as client_email) with read permisions.
* Get document id from spreadsheet url 

Once you are done, setup action like usage example. Recommend to store these keys at [GitHub Secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets).

## About private key

If you use GitHub Secrets to store JSON private key beware with copy and paste because you need to change all line breaks `\n` with real ones.

JSON private_key content it's something like:
```
-----BEGIN PRIVATE KEY-----\nBLABLABLABLABLA\nBLABLABLABLABLA\n-----END PRIVATE KEY-----\n
```
Needs to be something like:
```
-----BEGIN PRIVATE KEY-----
BLABLABLABLABLA
BLABLABLABLABLA
-----END PRIVATE KEY-----
```

## Contributing

Feel free to contribute with [issues](https://github.com/dibenlloch/google-sheets-secrets-action/issues)
or [Pull Requests](https://github.com/dibenlloch/google-sheets-secrets-action/pulls)

## License

This project is [MIT](https://github.com/dibenlloch/google-sheets-secrets-action/blob/master/LICENSE) licensed.




