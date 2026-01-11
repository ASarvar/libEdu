const bcrypt = require('bcryptjs');

const password = 'Admin123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }
  console.log('Bcrypt hash for password "' + password + '":');
  console.log(hash);
  console.log('\nCopy this hash and update database/schema.sql');
});
