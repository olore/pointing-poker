import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { TextInputWithButton } from '../../inputs/text-with-button';
import { Checkbox } from '../../inputs/checkbox';

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
        }
        setSubmitting(false);
      });
  }

  return (
    <div>
      <Formik
        initialValues={{ firstName: '', isGuest: false }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required')
        })}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Checkbox name="isGuest" label="Join as observer" />
            <TextInputWithButton name="firstName" label="Name" buttonLabel="Join" loading={isSubmitting} />
            <ErrorMessage name="firstName">{msg => <div className="has-text-danger">{msg}</div>}</ErrorMessage>
          </Form>
        )}
      </Formik>
    </div>
  );
}
