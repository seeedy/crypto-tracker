import React from 'react';
import css from './Wrapper.module.css';

const Wrapper = (props) => {
    return <div className={css.container}>{props.children}</div>;
};

export default Wrapper;
