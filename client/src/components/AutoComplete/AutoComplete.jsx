import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import api from '../../api';

const AutoComplete = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = async (id) => {
        setIsLoading(true);

        if (id === 'exchange') {
            // get list of exchanges from coingecko api
            const data = await api.getExchanges();
            // set as options in form
            console.log(data.data);
            setOptions(data.data);
            setIsLoading(false);
        }

        if (id === 'base') {
        }
    };

    return (
        <AsyncTypeahead
            id={props.id}
            isLoading={isLoading}
            labelKey='name'
            minLength={3}
            onSearch={() => handleSearch(props.id)}
            options={options}
            placeholder='...'
            onBlur={props.onBlur}
            onChange={props.onChange}

            /* renderMenuItemChildren={(option, props) => (
            <Fragment>
              <img
                alt={option.login}
                src={option.avatar_url}
                style={{
                  height: '24px',
                  marginRight: '10px',
                  width: '24px',
                }}
              />
              <span>{option.login}</span>
            </Fragment>
          )} */
        />
    );
};

export default AutoComplete;
