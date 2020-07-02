module.exports = {
 apps : [{
   name: 'NetsBlox',
   script: 'npm',

   // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
   args: 'start',
   autorestart: true,
   watch: false,
 }]
};
