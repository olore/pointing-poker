import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { TextInputWithButton } from '../../inputs/text-with-button';

export function AddPlayer({ gameId, onSubmit }) {
  function handleSubmit(values, { setSubmitting, setFieldError }) {
    const playerId = values.firstName;

    fetch(`/api/game/${gameId}/${playerId}/available`)
      .then(res => res.json())
      .then(res => {
        if (res.available) {
          onSubmit(playerId, values.isGuest);
        } else {
          setFieldError('firstName', 'Name already taken, try another');
          setSubmitting(false);
        }
      });
  }

  return (
    <div data-testid="add-player">
      <Formik
        initialValues={{ firstName: '' }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required')
        })}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <TextInputWithButton name="firstName" label="Name" buttonLabel="Join" loading={isSubmitting} />
            <ErrorMessage name="firstName">{msg => <div className="has-text-danger">{msg}</div>}</ErrorMessage>
          </Form>
        )}
      </Formik>
    </div>
  );
}
