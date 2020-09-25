import React from 'react';
import { Form, Col, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Typeahead } from 'react-bootstrap-typeahead';

import styles from './PositionInsertForm.module.scss';

const PositionInsertForm = (props) => {
    const validationSchema = yup.object({
        exchange: yup.string().required('Exchange is required'),
        base: yup.string().required('Trading base is required'),
        target: yup.string().required('Trading base is required'),
        direction: yup.string().required('Direction is required'),
        size: yup.number().positive().required('Size is required'),
        entry: yup.number().positive().required('Entry is required'),
    });

    return (
        <Container>
            <Formik
                initialValues={{
                    exchange: undefined,
                    base: undefined,
                    target: undefined,
                    direction: 'long',
                    size: 0,
                    entry: 0,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    console.log('submitting', values);
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
                    <Form noValidate onSubmit={handleSubmit} className={styles.form}>
                        <Form.Group controlId='formGroupExchange'>
                            <Form.Label>Exchange</Form.Label>
                            <Typeahead
                                id='exchange'
                                labelKey='name'
                                options={props.exchangeOptions}
                                onChange={(selected) => {
                                    console.log(selected);
                                    if (!selected.length) return;
                                    setFieldValue('exchange', selected[0].name);
                                }}
                                onBlur={() => {
                                    setFieldTouched('exchange', true);
                                    props.getTickersByExchange(values.exchange);
                                }}
                                placeholder='...'
                                isValid={touched.exchange && !errors.exchange}
                            />
                        </Form.Group>

                        <Form.Group controlId='formGroupPair'>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Base</Form.Label>
                                    <Typeahead
                                        id='base'
                                        options={props.baseOptions || []}
                                        disabled={!values.exchange}
                                        labelKey={(option) => `${option.base} (${option.id.toUpperCase()})`}
                                        exchange={values.exchange}
                                        onChange={(selected) => {
                                            if (!selected.length) return;
                                            setFieldValue('base', selected[0].base);
                                        }}
                                        onBlur={(e) => {
                                            setFieldTouched('base', true);
                                        }}
                                        placeholder='...'
                                        isValid={touched.base && !errors.base}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Target</Form.Label>
                                    <Form.Control
                                        as='select'
                                        name='target'
                                        disabled={!values.exchange}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.target}
                                        isValid={touched.target && !errors.target}
                                        className={styles.control}
                                        placeholder='...'
                                    >
                                        <option>BTC</option>
                                        <option>ETH</option>
                                        <option>USD</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId='formGroupDirection'>
                            <Form.Label>Direction</Form.Label>
                            <Form.Control
                                as='select'
                                name='direction'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.direction}
                                isValid={touched.direction && !errors.direction}
                                className={styles.control}
                            >
                                <option>long</option>
                                <option>short</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='formGroupSize'>
                            <Form.Label>Size</Form.Label>
                            <Form.Control
                                type='number'
                                name='size'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.size}
                                isValid={touched.size && !errors.size}
                                autoComplete='off'
                            />
                        </Form.Group>
                        <Form.Group controlId='formGroupEntry'>
                            <Form.Label>Entry</Form.Label>
                            <Form.Control
                                disabled={!values.target}
                                type='number'
                                step={values.target === 'USD' ? '0.01' : '0.00000001'}
                                name='entry'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.entry.toFixed(8).replace(/\.?0+$/, '')}
                                isValid={touched.entry && !errors.entry}
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
