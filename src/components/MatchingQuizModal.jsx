import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient.js';

function MatchingQuizModal({ currentUser, onClose, onComplete, initialPreferences }) {
  const { t } = useTranslation();
  const isEditing = Boolean(initialPreferences);

  const OPTION_GROUPS = [
    {
      key: 'pet_type_preference',
      label: t('quiz.petTypeLabel'),
      options: [
        { value: 'dog',  label: t('quiz.optDog') },
        { value: 'cat',  label: t('quiz.optCat') },
        { value: 'both', label: t('quiz.optBoth') },
      ],
    },
    {
      key: 'good_with_kids',
      label: t('quiz.kidsLabel'),
      options: [
        { value: 'yes', label: t('quiz.optYes') },
        { value: 'no',  label: t('quiz.optNo') },
      ],
    },
    {
      key: 'home_type',
      label: t('quiz.homeTypeLabel'),
      options: [
        { value: 'apartment', label: t('quiz.optApartment') },
        { value: 'house',     label: t('quiz.optHouse') },
      ],
    },
    {
      key: 'availability',
      label: t('quiz.availabilityLabel'),
      options: [
        { value: 'low',    label: t('quiz.optLow') },
        { value: 'medium', label: t('quiz.optMedium') },
        { value: 'high',   label: t('quiz.optHigh') },
      ],
    },
    {
      key: 'preferred_size',
      label: t('quiz.sizeLabel'),
      options: [
        { value: 'small',  label: t('quiz.optSmall') },
        { value: 'medium', label: t('quiz.optMedium') },
        { value: 'large',  label: t('quiz.optLarge') },
      ],
    },
    {
      key: 'preferred_location',
      label: t('quiz.locationLabel'),
      options: [
        { value: 'Upper Galilee',    label: t('quiz.loc_upperGalilee') },
        { value: 'Lower Galilee',    label: t('quiz.loc_lowerGalilee') },
        { value: 'Haifa and Krayot', label: t('quiz.loc_haifa') },
        { value: 'Sharon',           label: t('quiz.loc_sharon') },
        { value: 'Center',           label: t('quiz.loc_center') },
        { value: 'Jerusalem',        label: t('quiz.loc_jerusalem') },
        { value: 'Shephelah',        label: t('quiz.loc_shephelah') },
        { value: 'South',            label: t('quiz.loc_south') },
      ],
    },
  ];

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
      setError(t('quiz.errorAll'));
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
        <h2 className="modal-title">
          {isEditing ? t('quiz.editTitle') : t('quiz.title')}
        </h2>
        <p className="modal-message">
          {isEditing ? t('quiz.editSubtitle') : t('quiz.subtitle')}
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
              {submitting ? t('quiz.saving') : (isEditing ? t('quiz.saveChanges') : t('quiz.save'))}
            </button>
            <button type="button" className="modal-later-btn" onClick={onClose}>
              {isEditing ? t('quiz.cancel') : t('quiz.skipForNow')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MatchingQuizModal;
