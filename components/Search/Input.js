import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const TextInput = styled.TextInput`
    background-color: white;
    margin: 0px 30px;
    padding: 10px 20px;
    border-radius: 15px;
    margin-bottom: 50px;
`;

const Input = ({placeholder, value, onChange, onSubmit}) => 
    <TextInput
        placeholder={placeholder}
        returnKeyType={"search"}
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
    />

Input.propTypes ={
    placeholder: PropTypes.string.isRequired, 
    value: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired, 
    onSubmit: PropTypes.func.isRequired
};

export default Input;