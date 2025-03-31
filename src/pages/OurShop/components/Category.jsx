import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

import { Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Category = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Tiêu đề "DANH MỤC SẢN PHẨM" */}
            <AppBar position='static' sx={{ bgcolor: '#1976d2' }}>
                <Toolbar variant='dense'>
                    <Typography
                        variant='h6'
                        sx={{
                            flexGrow: 1,
                            textAlign: 'center',
                            color: 'white'
                        }}
                    >
                        DANH MỤC SẢN PHẨM
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Menu danh mục */}
            <Box
                sx={{
                    bgcolor: '#f5f5f5',
                    py: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2
                }}
            >
                <div>
                    <IconMenuItem
                        onClick={handleClick}
                        label='Danh mục'
                        rightIcon={<ExpandMoreIcon />}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            SẢN PHẨM BÁN LẺ
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            HÀNG HOT HÈ 2024
                        </MenuItem>
                        <NestedMenuItem
                            label='VÍ ĐIỆU KIỆN - KIT PHÁT TRIỂN'
                            parentMenuOpen={Boolean(anchorEl)}
                        >
                            <MenuItem onClick={handleClose}>TRIỂN</MenuItem>
                        </NestedMenuItem>
                        <NestedMenuItem
                            label='TOOL, THIẾT BỊ, PHỤ KIỆN'
                            parentMenuOpen={Boolean(anchorEl)}
                        >
                            <MenuItem onClick={handleClose}>
                                QUẠT LÝ NHIỆT ĐỘ
                            </MenuItem>
                        </NestedMenuItem>
                        <NestedMenuItem
                            label='CONNECTORS'
                            parentMenuOpen={Boolean(anchorEl)}
                        >
                            <MenuItem onClick={handleClose}>
                                CỔ ĐIỆN TỬ
                            </MenuItem>
                            <MenuItem onClick={handleClose}>NGUỒN</MenuItem>
                            <MenuItem onClick={handleClose}>PIN</MenuItem>
                            <MenuItem onClick={handleClose}>
                                LINH KIỆN THỬ ĐỘNG
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                LINH KIỆN BÁN DẪN
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                IC CHỨC NĂNG
                            </MenuItem>
                        </NestedMenuItem>
                    </Menu>
                </div>
            </Box>
        </Box>
    );
};

export default Category;
