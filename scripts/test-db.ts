import { db } from '@/lib/db';
import { migrate } from '@/lib/db/migrations';
import { organizationSchema } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function testDatabase() {
  try {
    console.log('🚀 Starting database test...');

    // Step 1: Run migrations
    console.log('\n📦 Running migrations...');
    await migrate();
    console.log('✅ Migrations completed');

    // Step 2: Test insert
    console.log('\n📝 Testing insert...');
    const testOrg = {
      name: 'Test Organization',
      status: 'trial' as const,
    };
    
    const [inserted] = await db.insert(organizationSchema)
      .values(testOrg)
      .returning();
    console.log('✅ Insert successful:', inserted);

    // Step 3: Test select
    console.log('\n🔍 Testing select...');
    const selected = await db.select()
      .from(organizationSchema)
      .where(eq(organizationSchema.id, inserted.id));
    console.log('✅ Select successful:', selected[0]);

    // Step 4: Test update
    console.log('\n📝 Testing update...');
    const [updated] = await db.update(organizationSchema)
      .set({ name: 'Updated Test Organization' })
      .where(eq(organizationSchema.id, inserted.id))
      .returning();
    console.log('✅ Update successful:', updated);

    // Step 5: Test delete
    console.log('\n🗑️  Testing delete...');
    const [deleted] = await db.delete(organizationSchema)
      .where(eq(organizationSchema.id, inserted.id))
      .returning();
    console.log('✅ Delete successful:', deleted);

    console.log('\n✨ All tests passed successfully!');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

testDatabase(); 