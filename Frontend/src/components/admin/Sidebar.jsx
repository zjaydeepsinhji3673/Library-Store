import React from 'react'
import { Menu, MenuItem, ProSidebar, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar( {wantSidebar, setWantSidebar} ) {
  const location = useLocation();
    const path = '/' + location?.pathname?.split('/')?.[1];
    const path2 = '/' + location?.pathname?.split('/')?.[2];
    console.log(path,path2);
    console.log(path2.length)
    if(path === '/admin' && path2 !== '/'){
      setWantSidebar(true);
    }
    else{
      setWantSidebar(false);
    }

    return(
      <div >
      <ProSidebar style={{maxHeight:'100vh'}}>
        <Menu iconShape="circle">
          <MenuItem>
            <Link to="/admin/dashboard">Dashboard</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin/books">Books</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin/add_book">Add Book</Link>
          </MenuItem>
          <SubMenu title="Orders">
            <MenuItem>
              <Link to="/admin/all_orders">All Orders</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/admin/pending_orders">Pending Orders</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/admin/accpeted_order">Accepted Orders</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/admin/rejected_order">Rejected Orders</Link>
              </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </div>
    )
 
}
