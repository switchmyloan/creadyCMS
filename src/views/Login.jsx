'use client'

import { useState } from 'react'
import Link from 'next/link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

import themeConfig from '@configs/themeConfig'

import AuthIllustrationWrapper from '@/auth/AuthIllustrationWrapper'

const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <AuthIllustrationWrapper>
      {/* Wrapper for centering */}
      <Card className="auth-card shadow-xl rounded-2xl">
          <CardContent className="sm:!p-10">
            <Link href={'/'} className="flex justify-center mb-6">
              <Logo />
            </Link>
            <div className="flex flex-col gap-1 mb-6">
              <Typography variant="h4">{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
              <Typography>Please sign-in to your account and start the adventure</Typography>
            </div>
            <form
              noValidate
              autoComplete="off"
              onSubmit={e => e.preventDefault()}
              className="flex flex-col gap-6"
            >
              <CustomTextField
                autoFocus
                fullWidth
                label="Email or Username"
                placeholder="Enter your email or username"
              />
              <CustomTextField
                fullWidth
                label="Password"
                placeholder="············"
                id="outlined-adornment-password"
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div className="flex justify-between items-center gap-x-3 gap-y-1 flex-wrap">
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Typography className="text-end" color="primary" component={Link} href={'/'}>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant="contained" type="submit">
                Login
              </Button>
              <div className="flex justify-center items-center flex-wrap gap-2">
                <Typography>New on our platform?</Typography>
                <Typography component={Link} href={'/'} color="primary">
                  Create an account
                </Typography>
              </div>
              <Divider className="gap-2 text-textPrimary">or</Divider>
              <div className="flex justify-center items-center gap-1.5">
                <IconButton className="text-facebook" size="small">
                  <i className="tabler-brand-facebook-filled" />
                </IconButton>
                <IconButton className="text-twitter" size="small">
                  <i className="tabler-brand-twitter-filled" />
                </IconButton>
                <IconButton className="text-textPrimary" size="small">
                  <i className="tabler-brand-github-filled" />
                </IconButton>
                <IconButton className="text-error" size="small">
                  <i className="tabler-brand-google-filled" />
                </IconButton>
              </div>
            </form>
          </CardContent>
        </Card>
    </AuthIllustrationWrapper>
  )
}

export default Login
