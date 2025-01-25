import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';

import { client, db } from '@/db';
import * as schema from '@/models/Schema';

// Load environment variables based on NODE_ENV
dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

/* eslint-disable no-console */
async function testDatabaseConnection() {
  try {
    console.log('Current environment:', process.env.NODE_ENV || 'development');
    console.log('Environment variables:', {
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    });

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    console.log('Connected to database successfully');

    // Test 1: Create an organization
    console.log('\nCreating test organization...');
    const [newOrg] = await db
      .insert(schema.organizationSchema)
      .values({
        id: crypto.randomUUID(),
        name: 'Test Organization',
        status: 'trial',
        trialExpirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      })
      .returning();

    if (!newOrg) {
      throw new Error('Failed to create organization');
    }
    console.log('Created organization:', newOrg);

    // Test 2: Create a user in that organization
    console.log('\nCreating test user...');
    const [newUser] = await db
      .insert(schema.userSchema)
      .values({
        id: crypto.randomUUID(),
        name: 'Test User',
        email: 'test@example.com',
        passwordHash: 'test-hash',
        role: 'admin',
        organizationId: newOrg.id,
        status: 'trial',
      })
      .returning();

    if (!newUser) {
      throw new Error('Failed to create user');
    }
    console.log('Created user:', newUser);

    // Test 3: Query the created data
    console.log('\nQuerying created data...');
    const result = await db
      .select()
      .from(schema.userSchema)
      .where(eq(schema.userSchema.id, newUser.id))
      .leftJoin(
        schema.organizationSchema,
        eq(schema.userSchema.organizationId, schema.organizationSchema.id),
      );

    console.log('Query result:', result);

    // Test 4: Update the user
    console.log('\nUpdating user...');
    const [updatedUser] = await db
      .update(schema.userSchema)
      .set({ name: 'Updated Test User' })
      .where(eq(schema.userSchema.id, newUser.id))
      .returning();

    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    console.log('Updated user:', updatedUser);

    // Test 5: Delete test data
    console.log('\nCleaning up test data...');
    await db
      .delete(schema.userSchema)
      .where(eq(schema.userSchema.id, newUser.id));
    await db
      .delete(schema.organizationSchema)
      .where(eq(schema.organizationSchema.id, newOrg.id));

    console.log('Test completed successfully!');

    // Close the connection
    await client.end();
  } catch (error) {
    console.error('Database test failed:', error);
    throw error;
  }
}
/* eslint-enable no-console */

// Run the test
testDatabaseConnection().catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
});
