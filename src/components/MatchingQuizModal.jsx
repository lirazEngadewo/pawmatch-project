import { useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

const OPTION_GROUPS = [
  {
    key: 'pet_type_preference',
    label: 'Are you looking for a dog, cat, or both?',
    options: [
      { value: 'dog', label: 'Dog' },
      { value: 'cat', label: 'Cat' },
      { value: 'both', label: 'Both' },
    ],
  },
  {
    key: 'good_with_kids',
    label: 'Do you have kids at home?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    key: 'home_type',
    label: 'Do you live in an apartment or a house?',
    options: [
      { value: 'apartment', label: 'Apartment' },
      { value: 'house', label: 'House' },
    ],
  },
  {
    key: 'availability',
    label: 'How much time can you dedicate to a pet daily?',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
  },
  {
    key: 'preferred_size',
    label: 'What size pet do you prefer?',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
  },
  {
    key: 'preferred_location',
    label: 'Where would you prefer to adopt from?',
    options: [
      { value: 'גליל עליון', label: 'גליל עליון' },
      { value: 'גליל תחתון', label: 'גליל תחתון' },
      { value: 'חיפה והקריות', label: 'חיפה והקריות' },
      { value: 'השרון', label: 'השרון' },
      { value: 'מרכז', label: 'מרכז' },
      { value: 'ירושלים', label: 'ירושלים' },
      { value: 'שפלה', label: 'שפלה' },
      { value: 'דרום', label: 'דרום' },
    ],
  },
];

function MatchingQuizModal({ currentUser, onClose, onComplete, initialPreferences }) {
  const isEditing = Boolean(initialPreferences);

  const [answers, setAnswers] = useState({
    pet_type_preference: initialPreferences?.pet_type_preference ?? '',
    good_with_kids: initialPreferences ? (initialPreferences.good_with_kids ? 'yes' : 'no') : '',
    home_type: initialPreferences?.home_type ?? '',
    availability: initialPreferences?.availability ?? '',
    preferred_size: initialPreferences?.preferred_size ?? '',
    preferred_location: initialPreferences?.preferred_location ?? '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const setAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allAnswered = OPTION_GROUPS.every((q) => answers[q.key]);
    if (!allAnswered) {
      setError('Please answer all questions so we can personalize your matches.');
      return;
    }

    setError('');
    setSubmitting(true);

    const { error: dbError } = await supabase.from('user_preferences').upsert(
      {
        user_id: currentUser.id,
        pet_type_preference: answers.pet_type_preference,
        good_with_kids: answers.good_with_kids === 'yes',
        home_type: answers.home_type,
        availability: answers.availability,
        preferred_size: answers.preferred_size,
        preferred_location: answers.preferred_location,
        completed: true,
      },
      { onConflict: 'user_id' }
    );

    setSubmitting(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    onComplete?.();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card quiz-modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{isEditing ? 'Update Your Preferences' : 'Find Your Perfect Match'}</h2>
        <p className="modal-message">
          {isEditing
            ? 'Update your answers to refine your personalized pet recommendations.'
            : 'Answer a few quick questions so we can personalize your pet recommendations.'}
        </p>

        <form className="quiz-form" onSubmit={handleSubmit}>
          {OPTION_GROUPS.map((q) => (
            <div className="quiz-question" key={q.key}>
              <label className="quiz-question-label">{q.label}</label>
              <div className="quiz-options">
                {q.options.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`quiz-option${answers[q.key] === opt.value ? ' quiz-option--active' : ''}`}
                    onClick={() => setAnswer(q.key, opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {error && <p className="form-error">{error}</p>}

          <div className="quiz-actions">
            <button type="submit" className="button button-primary" disabled={submitting}>
              {submitting ? 'Saving…' : (isEditing ? 'Save changes' : 'Save my preferences')}
            </button>
            <button type="button" className="modal-later-btn" onClick={onClose}>
              {isEditing ? 'Cancel' : 'Skip for now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MatchingQuizModal;
