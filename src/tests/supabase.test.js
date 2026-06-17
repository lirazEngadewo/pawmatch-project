/**
 * Integration tests for Supabase CRUD operations.
 *
 * Prerequisites — before running these tests:
 *  1. Create a dedicated test user in Supabase Auth (Authentication → Users → Invite / Add user).
 *  2. Add to .env.test (gitignored) at the project root:
 *       VITE_TEST_USER_EMAIL=your-test@example.com
 *       VITE_TEST_USER_PASSWORD=yourTestPassword
 *  3. Ensure the `public.pets` table contains a row with id='milo' (required by the FK
 *     constraint on adoption_requests.pet_id). If your pets table is empty, either insert
 *     the row manually or change TEST_PET_ID to a pet_id that already exists.
 *
 * NOTE: The user_preferences test performs an upsert that overwrites the test user's row.
 * This is intentional — use a dedicated test account, not a real user account.
 */

import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const TEST_EMAIL = import.meta.env.VITE_TEST_USER_EMAIL;
const TEST_PASSWORD = import.meta.env.VITE_TEST_USER_PASSWORD;
const TEST_PET_ID = 'milo'; // must exist in public.pets

let userId;
const cleanupRequestIds = [];
const cleanupFavoriteIds = [];

// ── Setup / teardown ──────────────────────────────────────────────────────────

beforeAll(async () => {
  if (!TEST_EMAIL || !TEST_PASSWORD) {
    throw new Error(
      'Set VITE_TEST_USER_EMAIL and VITE_TEST_USER_PASSWORD in .env.test before running Supabase tests.'
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });

  if (error) throw new Error(`Test user sign-in failed: ${error.message}`);
  userId = data.user.id;
}, 15000);

afterAll(async () => {
  if (cleanupRequestIds.length > 0) {
    await supabase.from('adoption_requests').delete().in('id', cleanupRequestIds);
  }
  if (cleanupFavoriteIds.length > 0) {
    await supabase.from('favorites').delete().in('id', cleanupFavoriteIds);
  }
  await supabase.auth.signOut();
}, 15000);

// ── adoption_requests ─────────────────────────────────────────────────────────

describe('adoption_requests', () => {

  test('inserting a request creates a row with the correct fields', async () => {
    const { data, error } = await supabase
      .from('adoption_requests')
      .insert({
        user_id: userId,
        pet_id: TEST_PET_ID,
        message: 'Meeting Request\nFull Name: Test User\nEmail: test@example.com',
      })
      .select()
      .single();

    expect(error).toBeNull();
    expect(data).not.toBeNull();
    expect(data.user_id).toBe(userId);
    expect(data.pet_id).toBe(TEST_PET_ID);
    expect(data.status).toBe('pending');    // default value
    expect(data.message).toContain('Meeting Request');
    expect(data.id).toBeTruthy();

    cleanupRequestIds.push(data.id);
  }, 10000);

  test('RLS: cannot insert a row with a different user_id', async () => {
    const fakeUserId = '00000000-0000-0000-0000-000000000000';
    const { error } = await supabase
      .from('adoption_requests')
      .insert({ user_id: fakeUserId, pet_id: TEST_PET_ID, message: 'Should be blocked by RLS' });

    expect(error).not.toBeNull();
  }, 10000);

  test('RLS: SELECT returns only the current user\'s rows', async () => {
    const { data, error } = await supabase
      .from('adoption_requests')
      .select('user_id');

    expect(error).toBeNull();
    for (const row of data) {
      expect(row.user_id).toBe(userId);
    }
  }, 10000);

});

// ── user_preferences ──────────────────────────────────────────────────────────

describe('user_preferences', () => {

  test('upserting preferences with completed=true saves correctly', async () => {
    const prefs = {
      user_id: userId,
      completed: true,
      pet_type_preference: 'cat',
      availability: 'low',
      home_type: 'apartment',
      good_with_kids: false,
      preferred_size: 'small',
      preferred_location: null,
    };

    const { data, error } = await supabase
      .from('user_preferences')
      .upsert(prefs, { onConflict: 'user_id' })
      .select()
      .single();

    expect(error).toBeNull();
    expect(data.user_id).toBe(userId);
    expect(data.completed).toBe(true);
    expect(data.pet_type_preference).toBe('cat');
    expect(data.home_type).toBe('apartment');
    expect(data.good_with_kids).toBe(false);
  }, 10000);

});

// ── favorites ─────────────────────────────────────────────────────────────────

describe('favorites', () => {

  test('inserting a favorite creates a row that appears in a subsequent fetch', async () => {
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, pet_id: TEST_PET_ID })
      .select()
      .single();

    expect(error).toBeNull();
    expect(data.user_id).toBe(userId);
    expect(data.pet_id).toBe(TEST_PET_ID);
    cleanupFavoriteIds.push(data.id);

    // Verify it shows up in a fetch
    const { data: list, error: listError } = await supabase
      .from('favorites')
      .select('pet_id')
      .eq('user_id', userId);

    expect(listError).toBeNull();
    expect(list.map((r) => r.pet_id)).toContain(TEST_PET_ID);
  }, 10000);

});
