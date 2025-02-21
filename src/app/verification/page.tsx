"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertTitle, Button, Card, CardContent, CardHeader, CircularProgress, Container, Typography, Box } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon, Mail as MailIcon } from '@mui/icons-material';

const EmailVerificationPage: React.FC = () => {
  const router = useRouter();
  const [verificationState, setVerificationState] = React.useState<'pending' | 'success' | 'error'>('pending');
  const [loading, setLoading] = React.useState(false);

  const handleResendEmail = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const getAlertContent = () => {
    switch (verificationState) {
      case 'success':
        return {
          icon: <CheckCircleIcon sx={{ fontSize: 28, color: 'success.main' }} />,
          title: 'Email Verified Successfully',
          description: 'Your email has been verified. You can now access all features.',
          severity: 'success' as const
        };
      case 'error':
        return {
          icon: <ErrorIcon sx={{ fontSize: 28, color: 'error.main' }} />,
          title: 'Verification Failed',
          description: 'The verification link has expired or is invalid. Please request a new one.',
          severity: 'error' as const
        };
      default:
        return {
          icon: <MailIcon sx={{ fontSize: 28, color: 'info.main' }} />,
          title: 'Verify Your Email',
          description: 'Please check your inbox and click the verification link we sent you.',
          severity: 'info' as const
        };
    }
  };

  const content = getAlertContent();

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.50',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={3}>
          <CardHeader 
            title={
              <Typography variant="h5" component="h1" align="center" fontWeight="bold">
                Email Verification
              </Typography>
            }
          />
          <CardContent>
            <Alert 
              severity={content.severity}
              icon={content.icon}
              sx={{ mb: 3 }}
            >
              <AlertTitle sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                {content.title}
              </AlertTitle>
              <Typography variant="body2">
                {content.description}
              </Typography>
            </Alert>

            {verificationState === 'pending' && (
              <Box textAlign="center" color="text.secondary" mb={3}>
                <Typography variant="body1" gutterBottom>
                  Didn't receive the email?
                </Typography>
                <Typography variant="body2">
                  Check your spam folder or request a new verification link.
                </Typography>
              </Box>
            )}

            <Box display="flex" justifyContent="center">
              {verificationState === 'pending' && (
                <Button
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  onClick={() => router.push("/home")} type="button"
                  sx={{ maxWidth: 300 }}
                  startIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  {loading ? 'Sending...' : 'Verified Email'}
                </Button>
              )}

              {verificationState === 'success' && (
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ maxWidth: 300 }}
                >
                  Continue to Dashboard
                </Button>
              )}
              {verificationState === 'error' && (
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  disabled={loading}
                  onClick={handleResendEmail}
                  sx={{ maxWidth: 300 }}
                >
                  Request New Link
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default EmailVerificationPage;