import { migrate } from '@/lib/db/migrations';

console.log('🚀 Running migrations...');

migrate()
  .then(() => {
    console.log('✅ Migrations completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }); 