import {
  AppBar,
  Box,
  ClickAwayListener,
  Collapse,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link as GLink } from "gatsby"
import React, { useEffect, useRef, useState } from "react"

import "../styles/TopBar.scss"
import { Photo, YouTube, Work } from "@mui/icons-material"

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const NavItem = ({ icon, text, href }) => (
    <Link component={GLink} to={href} color="secondary">
      <ListItemButton className="NavItem" onClick={() => setIsMenuOpen(false)}>
        <Box className="NavItemContent">
          <ListItemIcon className="NavItemIcon">{icon}</ListItemIcon>
          <ListItemText
            className="NavItemText"
            primary={text}
            primaryTypographyProps={{ variant: "h6" }}
          />
        </Box>
      </ListItemButton>
    </Link>
  )

  const menuButtonRef = useRef()
  const onMenuClickAway = (e) => {
    if (menuButtonRef.current.contains(e.target)) return
    setIsMenuOpen(false)
  }
  useEffect(() => {
    const onWindowBlur = (e) => {
      setTimeout(() => {
        if (document.activeElement.tagName !== "IFRAME") return
        setIsMenuOpen(false)
      })
    }
    window.addEventListener("blur", onWindowBlur)
    return () => window.removeEventListener("blur", onWindowBlur)
  }, [])

  return (
    <Box className="BarContainer">
      <AppBar position="sticky" className="AppBar">
        <Collapse in={isMenuOpen}>
          <ClickAwayListener onClickAway={onMenuClickAway}>
            <List className="NavMenu" disablePadding>
              <NavItem icon={<Photo />} text="Gallery" href="/" />
              <NavItem icon={<YouTube />} text="Videos" href="/videos" />
              <NavItem
                icon={<Work />}
                text="Résumé"
                href="https://jules.strosahl.org"
              />
            </List>
          </ClickAwayListener>
        </Collapse>
        <Toolbar className="Toolbar">
          <Link component={GLink} className="Logo" to="/" underline="none">
            {"{js}"}
          </Link>
          <div className="BarContent">
            <div className="TextContainer">
              <Typography variant="h4" className="Title">
                loverom.nyc
              </Typography>
            </div>
          </div>
          <Box className="MenuButton" ref={menuButtonRef}>
            <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
