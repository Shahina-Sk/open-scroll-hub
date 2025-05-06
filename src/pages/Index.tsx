
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  
  // If user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled in the auth context
      console.error('Login failed');
    } finally {
      setIsLoginLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignupLoading(true);
    
    try {
      if (!signupName || !signupEmail || !signupPassword) {
        throw new Error('All fields are required');
      }
      
      await signup(signupEmail, signupName, signupPassword);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled in the auth context
      console.error('Signup failed');
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="nexus-container py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-nexus-800">Nexus</h1>
        </div>
      </header>
      
      <main className="flex-1 flex">
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="flex-1 flex items-center justify-center p-8 md:p-16">
            <div className="max-w-md w-full">
              <h1 className="text-3xl font-bold mb-2">Welcome to Nexus</h1>
              <p className="text-gray-600 mb-8">
                Connect with professionals, share insights, and grow your network.
              </p>
              
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Log In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Card>
                    <form onSubmit={handleLogin}>
                      <CardHeader>
                        <CardTitle>Log In</CardTitle>
                        <CardDescription>
                          Enter your credentials to access your account
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="login-email">
                            Email
                          </label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="you@example.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium" htmlFor="login-password">
                              Password
                            </label>
                            <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                              Forgot password?
                            </Button>
                          </div>
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="w-full" disabled={isLoginLoading}>
                          {isLoginLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>
                      Demo account: john.doe@example.com / password123
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="signup">
                  <Card>
                    <form onSubmit={handleSignup}>
                      <CardHeader>
                        <CardTitle>Create an Account</CardTitle>
                        <CardDescription>
                          Enter your details to create your account
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="signup-name">
                            Full Name
                          </label>
                          <Input
                            id="signup-name"
                            placeholder="John Doe"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="signup-email">
                            Email
                          </label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="you@example.com"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="signup-password">
                            Password
                          </label>
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                          />
                          <p className="text-xs text-gray-500">
                            Must be at least 6 characters
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="w-full" disabled={isSignupLoading}>
                          {isSignupLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="hidden md:flex md:flex-1 bg-gradient-to-br from-nexus-600 to-nexus-800 text-white p-16 items-center justify-center">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-6">Grow Your Professional Network</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-white text-nexus-800 text-sm flex items-center justify-center mr-2">✓</span>
                  <span>Connect with industry professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-white text-nexus-800 text-sm flex items-center justify-center mr-2">✓</span>
                  <span>Share your expertise and insights</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-white text-nexus-800 text-sm flex items-center justify-center mr-2">✓</span>
                  <span>Discover new opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-white text-nexus-800 text-sm flex items-center justify-center mr-2">✓</span>
                  <span>Stay up-to-date with industry trends</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t py-6">
        <div className="nexus-container text-center text-gray-500 text-sm">
          <p>© 2025 Nexus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
