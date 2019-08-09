import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import { FieldTitle, useInput } from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';
import InputHelperText from './InputHelperText';
import InputPropTypes from './InputPropTypes';

const BooleanInput = ({
    label,
    fullWidth,
    helperText,
    onBlur,
    onChange,
    onFocus,
    options,
    resource,
    source,
    validate,
    ...rest
}) => {
    const {
        id,
        input: { onChange: finalFormOnChange, value, ...inputProps },
        isRequired,
        meta: { error, touched },
    } = useInput({
        onBlur,
        onChange,
        onFocus,
        resource,
        source,
        type: 'checkbox',
        validate,
    });

    const handleChange = useCallback(
        (event, value) => {
            finalFormOnChange(value);
        },
        [finalFormOnChange]
    );

    return (
        <FormGroup {...sanitizeRestProps(rest)}>
            <FormControlLabel
                htmlFor={id}
                control={
                    <Switch
                        id={id}
                        color="primary"
                        checked={!!value}
                        onChange={handleChange}
                        {...inputProps}
                        {...options}
                    />
                }
                label={
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />
                }
            />
            {helperText || (touched && !!error) ? (
                <FormHelperText error={!!error}>
                    <InputHelperText
                        touched={touched}
                        error={error}
                        helperText={helperText}
                    />
                </FormHelperText>
            ) : null}
        </FormGroup>
    );
};

BooleanInput.propTypes = {
    ...InputPropTypes,
    ...FormGroup.propTypes,
    options: PropTypes.shape(Switch.propTypes),
};

BooleanInput.defaultProps = {
    options: {},
};

export default BooleanInput;
