import React from 'react'
import { Link } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownItem,
  MenuMenu,
  MenuItem,
  Button,
  Dropdown,
  Menu,
  Container,
} from 'semantic-ui-react'

export default function Navi() {
  return (
    <div>
      <Menu inverted fixed >
        <Container>
        <MenuItem>
        <Link to={"/"}>Kitaplık</Link>            
        </MenuItem>
          <MenuMenu position='right'>
            <Dropdown item text='İşlemler'>
              <DropdownMenu>
                <DropdownItem>sepete git</DropdownItem>
                <DropdownItem>kitaplığa git</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <MenuItem>
              <Link to={"/signup"} primary>Sign Up</Link>
            </MenuItem>
          </MenuMenu>
        </Container>
      </Menu>
    </div>
  )
}