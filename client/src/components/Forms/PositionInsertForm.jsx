import React from 'react';
import { Form, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { AutoComplete } from '../';
import styles from './PositionInsertForm.module.scss';

const PositionInsertForm = (props) => {
    const validationSchema = yup.object({
        exchange: yup.string().required('Exchange is required'),
        base: yup.object().required('Trading base is required'),
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
                    <Form noValidate onSubmit={handleSubmit} className={styles.form}>
                        <Form.Group controlId='formGroupExchange' className={styles.group}>
                            <Form.Label>Exchange</Form.Label>
                            <AutoComplete
                                id='exchange'
                                labelKey='name'
                                minLength={3}
                                onChange={(selected) => {
                                    console.log(selected);
                                    if (!selected.length) return;
                                    setFieldValue('exchange', selected[0].name);
                                }}
                                onBlur={() => console.log('blur')}
                            />
                        </Form.Group>
                        {values.exchange && (
                            <Form.Group controlId='formGroupPair'>
                                <Form.Label>Base</Form.Label>
                                <AutoComplete
                                    id='base'
                                    options={props.baseOptions || []}
                                    labelKey={(option) => `${option.base} (${option.id.toUpperCase()})`}
                                    exchange={values.exchange}
                                    onChange={(selected) => {
                                        console.log(selected);
                                        if (!selected.length) return;
                                        setFieldValue('base', selected[0]);
                                        props.getTickersByExchange(selected[0].id);
                                    }}
                                    onBlur={(e) => {
                                        setFieldTouched('base', true);
                                    }}
                                    placeholder='...'
                                />
                                <Form.Label>Target</Form.Label>
                                <Form.Control
                                    as='select'
                                    name='target'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.target}
                                    isValid={touched.target && !errors.target}
                                    className={styles.control}
                                >
                                    <option>BTC</option>
                                    <option>ETH</option>
                                    <option>USD</option>
                                </Form.Control>
                                {/* <AutoComplete
                                    id='target'
                                    options={[
                                        { name: 'BTC', id: 'btc' },
                                        { name: 'USD', id: 'usd' },
                                        { name: 'ETH', id: 'eth' },
                                    ]}
                                    labelKey='name'
                                    onChange={(selected) => {
                                        if (!selected.length) return;
                                        setFieldValue('target', selected[0].target || '');
                                    }}
                                    onBlur={(e) => {
                                        setFieldTouched('target', true);
                                    }}
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
                                className={styles.control}
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
