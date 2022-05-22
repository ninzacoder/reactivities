import { NavLink } from 'react-router-dom';
import { Button, Container, Image, Menu } from 'semantic-ui-react';
import '../../app/layout/styles.css';


export default function Navbar(){ 

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item exact header as={NavLink} to="/" >
                    <Image src='.\assets\logo.png' alt='logo' style={{marginRight:10}}></Image>
                    </Menu.Item>
                <Menu.Item exact name='Activities' as={NavLink} to="/activities" />
                <Menu.Item>
                    <Button exact as={NavLink} to="/createActivity" positive content='Create Activity'></Button>
                </Menu.Item>
            </Container>
        </Menu>

        
    )
}