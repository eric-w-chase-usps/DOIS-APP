import { useState } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { FaRegEnvelope } from "react-icons/fa";
import uspsImg from "./assets/usps-transp-outline.png";
import './App.css';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LuMenu} from "react-icons/lu";
import Button from '@mui/material/Button';

export default function LandingPg(){

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Current date and time
  const currentDateTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  }).replace(/^(\w+), /, '$1 | ')
    .replace(/, (\d{4}), /, ' | $1 | ')
    .replace(/\bat\b/g, '|');

  return (
    <Box sx={{ flexGrow:1 }}>
      <AppBar position="static" style={{ backgroundColor: '#036' }}>
        <Toolbar>
          {/* Left-side */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap:"10px"}}><FaRegEnvelope size="30"/><b className="decal">Delivery Operations Information System</b> (DOIS)</span>
          {/* Right-side */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap:"10px", marginLeft:'auto'}}>
            <img src={uspsImg} alt="USPS logo" width="150" height="30" />
          </span>
        </Toolbar>
      </AppBar>

        <br/>
      
        {/* =====================================================
            SECOND SECTION
            ===================================================== */}
        <Toolbar
          sx={{
            backgroundColor: 'white',
            color: '#333',
            minHeight: '60px',
            borderTop: '1px solid rgba(0,0,0,0.15)'
          }}
        >

          {/* Page Title - Left */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            Station ID
          </Typography>
            
          {/* Date/Time - Right */}
          <Typography
            variant="body2"
            sx={{
              marginLeft: 'auto',
              marginRight: 2,
              color: '#555'
            }}
          >
            Account Name{" "}
            {currentDateTime}
          </Typography>

          {/* User Menu */}
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMenuOpen}
            aria-label="user account menu"
          >
            <LuMenu />
          </IconButton>

          {/* Account Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              User Profile
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              Account Settings
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              Sign Out
            </MenuItem>

          </Menu>
        </Toolbar>

        <AppBar position="static" sx={{ width: '85%', margin: '0 auto',  backgroundColor: '#d3d3d3', color: '#333', boxShadow: 'none', borderRadius: '4px'}}>
            <p>You have # active errors anomalies.  Please review and take action <Button variant="contained" > View </Button></p>
        </AppBar>

    </Box> 
  );
}

