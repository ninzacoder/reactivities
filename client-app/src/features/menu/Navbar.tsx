import React from 'react';
import { Button, Container, Image, Menu } from 'semantic-ui-react';
import '../../app/layout/styles.css';

export default function Navbar(){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <Image src='.\assets\logo.png' alt='logo' style={{marginRight:10}}></Image>
                        Reactivities
                    </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button positive content='Create Activity'></Button>
                </Menu.Item>
            </Container>
        </Menu>

        
    )
}