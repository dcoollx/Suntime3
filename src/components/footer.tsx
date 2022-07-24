import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

export default function Footer(){
    const styles = {
        color: 'white'
    }

    return (
        <Menu as="footer" inverted vertical fixed='bottom' fluid >
            <Container style={styles}>&copy; 2022     <a href="#" target="_blank"> Privacy Policy</a></Container>
            
        </Menu>
    );
}