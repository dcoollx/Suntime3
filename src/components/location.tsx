import React from 'react';

export default function Location(props: any){
    const styles = {
        color: 'white'
    }
    return (
    <div style={styles}>
        {props.gps || ' ...Getting curent location'}
    </div>)
}