"use client"

import React, { useState } from 'react';
import {AppBar,Toolbar,Typography,Avatar,TextField,Button,Card,CardContent,IconButton,Box,Container,Dialog,DialogTitle,DialogContent,DialogActions,Alert,InputAdornment,CircularProgress,} from '@mui/material';
import {AccountCircle,Email,Phone,LocationOn,Menu as MenuIcon,PhotoCamera,Visibility,VisibilityOff,Lock,} from '@mui/icons-material';
import Navbar from '../../components/Navbar';

interface ProfileFormData {
  username: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  // Profile Form State
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
  });

  // Password Reset State
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Password validation
  const validatePasswords = (): string | null => {
    const { newPassword, confirmPassword } = passwordData;
    if (newPassword.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(newPassword)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(newPassword)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(newPassword)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*]/.test(newPassword)) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }
    if (newPassword !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  // Handle password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validatePasswords();
    if (validationError) {
      setResetError(validationError);
      return;
    }

    setIsSubmitting(true);
    setResetError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResetSuccess(true);
      setTimeout(() => {
        setIsResetDialogOpen(false);
        setResetSuccess(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }, 2000);
    } catch (error) {
      setResetError('Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setResetError(null);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50">
      {/* AppBar */}
      <AppBar position="static" className="bg-white shadow-md">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" className="text-gray-800">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="text-gray-800 flex-grow">
            Profile Settings
          </Typography>
          <Button color="inherit" className="text-gray-800">
            <AccountCircle className="mr-2" />
            Account
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" className="py-8">
        <Card className="shadow-xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32" />
          
          <div className="relative px-6">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <Avatar
                  sx={{ width: 120, height: 120 }}
                  className="border-4 border-white shadow-lg"
                >
                  A
                </Avatar>
                <IconButton
                  className="absolute bottom-0 right-0 bg-white shadow-md hover:bg-gray-100"
                  size="small"
                >
                  <PhotoCamera fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>

          <CardContent className="pt-20">
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {/* ... Previous form fields remain the same ... */}
              <div className="space-y-4">
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <TextField
                    fullWidth
                    name="username"
                    label="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <AccountCircle className="mr-2 text-gray-400" />,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <Email className="mr-2 text-gray-400" />,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <Phone className="mr-2 text-gray-400" />,
                    }}
                    variant="outlined"
                  />
                </div>

                {/* Location Section */}
                <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <TextField
                    fullWidth
                    name="country"
                    label="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <LocationOn className="mr-2 text-gray-400" />,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    name="state"
                    label="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <LocationOn className="mr-2 text-gray-400" />,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    name="city"
                    label="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <LocationOn className="mr-2 text-gray-400" />,
                    }}
                    variant="outlined"
                  />
                </Box>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Update Profile
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => setIsResetDialogOpen(true)}
                  startIcon={<Lock />}
                >
                  Reset Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>

      {/* Reset Password Dialog */}
      <Dialog 
        open={isResetDialogOpen} 
        onClose={() => !isSubmitting && setIsResetDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Reset Password
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleResetPassword} className="space-y-4 pt-2">
            {resetError && (
              <Alert severity="error" className="mb-4">
                {resetError}
              </Alert>
            )}
            {resetSuccess && (
              <Alert severity="success" className="mb-4">
                Password successfully reset!
              </Alert>
            )}
            
            <TextField
              fullWidth
              name="currentPassword"
              label="Current Password"
              type={showPasswords.current ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              disabled={isSubmitting}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('current')}
                      edge="end"
                    >
                      {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              name="newPassword"
              label="New Password"
              type={showPasswords.new ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              disabled={isSubmitting}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('new')}
                      edge="end"
                    >
                      {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              disabled={isSubmitting}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('confirm')}
                      edge="end"
                    >
                      {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="caption" color="textSecondary" className="block mt-2">
              Password must contain at least 8 characters, including uppercase, lowercase, 
              numbers, and special characters (!@#$%^&*).
            </Typography>
          </form>
        </DialogContent>
        <DialogActions className="p-4">
          <Button 
            onClick={() => setIsResetDialogOpen(false)} 
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
};

export default ProfilePage;