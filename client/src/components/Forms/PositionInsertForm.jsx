import React from 'react';
import { Form, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';

import { AutoComplete } from '../';

const PositionInsertForm = (props) => {
    const validationSchema = yup.object({
        exchange: yup.string().required('Exchange is required'),
        base: yup.object().required('Traiding base is required'),
        direction: yup.string().required('Direction is required'),
        size: yup.number().positive().required('Size is required'),
        entry: yup.number().positive().required('Entry is required'),
    });

    return (
        <Container>
            <Formik
                initialValues={{ exchange: '', base: '', target: '', direction: 'long', size: 0, entry: 0 }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    props.insertPosition(values);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    isSubmitting,
                    isValid,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId='formGroupExchange'>
                            <Form.Label>Exchange</Form.Label>
                            {/* <Form.Control
                                type='text'
                                name='exchange'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.exchange}
                                isValid={touched.exchange && !errors.exchange}
                                autoComplete='off'
                            /> */}
                            <AutoComplete
                                id='exchange'
                                onChange={(sel) => {
                                    console.log(sel);
                                    if (!sel.length) return;
                                    setFieldValue('exchange', sel[0].name);
                                }}
                                onBlur={() => console.log('blur')}
                            />
                        </Form.Group>
                        {values.exchange && (
                            <Form.Group controlId='formGroupPair'>
                                <Form.Label>Base</Form.Label>
                                <AutoComplete id='base' exchange={values.exchange} />
                                {/* <Typeahead
                                    type='text'
                                    name='base'
                                    id='base'
                                    labelKey='base'
                                    onChange={(selected) => {
                                        console.log(selected);
                                        if (!selected.length) return;
                                        setFieldValue('base', selected[0]);
                                        props.getTargetsByBase(selected[0].id);
                                    }}
                                    onBlur={(e) => {
                                        setFieldTouched('base', true);
                                    }}
                                    options={props.baseOptions || []}
                                    placeholder='...'
                                /> */}
                                <Form.Label>Target</Form.Label>
                                {/* <Typeahead
                                    type='text'
                                    name='target'
                                    id='target'
                                    labelKey='target'
                                    onChange={(selected) => {
                                        if (!selected.length) return;
                                        setFieldValue('target', selected[0].target || '');
                                    }}
                                    onBlur={(e) => {
                                        setFieldTouched('target', true);
                                    }}
                                    options={props.targetOptions || []}
                                    placeholder='...'
                                /> */}
                            </Form.Group>
                        )}
                        <Form.Group controlId='formGroupDirection'>
                            <Form.Label>Direction</Form.Label>
                            <Form.Control
                                as='select'
                                name='direction'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.direction}
                                isValid={touched.direction && !errors.direction}
                            >
                                <option>long</option>
                                <option>short</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='formGroupSize'>
                            <Form.Label>Size</Form.Label>
                            <Form.Control
                                type='text'
                                name='size'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.size}
                                isValid={touched.size && !errors.size}
                                isInvalid={errors.size}
                                autoComplete='off'
                            />
                        </Form.Group>
                        <Form.Group controlId='formGroupEntry'>
                            <Form.Label>Entry</Form.Label>
                            <Form.Control
                                type='text'
                                name='entry'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.entry}
                                isValid={touched.entry && !errors.entry}
                                isInvalid={errors.entry}
                                autoComplete='off'
                            />
                        </Form.Group>
                        <button variant='primary' type='submit'>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default PositionInsertForm;
