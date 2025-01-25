import { supabase } from '../client';
import type { Database } from '../types';

type Tables = Database['public']['Tables'];

/**
 * Get all records from a table for an organization
 */
export async function getOrganizationRecords<T extends keyof Tables>(
  table: T,
  organizationId: string,
) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('organization_id', organizationId);

  if (error) {
    throw error;
  }
  return data as Tables[T]['Row'][];
}

/**
 * Get a single record by ID
 */
export async function getRecordById<T extends keyof Tables>(
  table: T,
  id: string,
) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }
  return data as Tables[T]['Row'];
}

/**
 * Create a new record
 */
export async function createRecord<T extends keyof Tables>(
  table: T,
  data: Tables[T]['Insert'],
) {
  const { data: record, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return record as Tables[T]['Row'];
}

/**
 * Update a record
 */
export async function updateRecord<T extends keyof Tables>(
  table: T,
  id: string,
  data: Tables[T]['Update'],
) {
  const { data: record, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return record as Tables[T]['Row'];
}

/**
 * Delete a record
 */
export async function deleteRecord<T extends keyof Tables>(
  table: T,
  id: string,
) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) {
    throw error;
  }
}
