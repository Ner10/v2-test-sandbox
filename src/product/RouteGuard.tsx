"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { routes } from '@/resources';
import { Flex, Spinner, Column, Heading, Text, Button, Icon } from '@once-ui-system/core';
import NotFound from '@/app/not-found';

interface RouteGuardProps {
    children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
    const pathname = usePathname();
    const [isRouteEnabled, setIsRouteEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // API dokümantasyonu için doğru şifre
    const API_PASSWORD = 'PaymentAPI2024!';

    useEffect(() => {
        // Local storage'dan authentication durumunu kontrol et
        const authStatus = localStorage.getItem('api-docs-auth');
        if (authStatus === 'authenticated') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const performChecks = async () => {
            setLoading(true);
            setIsRouteEnabled(false);

            const checkRouteEnabled = () => {
                if (!pathname) return true;
                
                if (pathname === '/api-reference' || pathname === '/sandbox') {
                    return routes[pathname as keyof typeof routes] === true;
                }
                
                return true;
            };

            const routeEnabled = checkRouteEnabled();
            setIsRouteEnabled(routeEnabled);
            setLoading(false);
        };

        performChecks();
    }, [pathname]);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === API_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
            localStorage.setItem('api-docs-auth', 'authenticated');
        } else {
            setError('Yanlış şifre. Lütfen tekrar deneyin.');
            setPassword('');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('api-docs-auth');
        setPassword('');
    };

    if (loading) {
        return (
        <Flex fillWidth paddingY="128" horizontal="center">
            <Spinner />
        </Flex>
        );
    }

    if (!isRouteEnabled) {
        return (
          <NotFound/>
        );
    }

    // Eğer kullanıcı authenticate olmamışsa şifre ekranını göster
    if (!isAuthenticated) {
        return (
            <Flex fillWidth paddingY="128" horizontal="center">
                <Column maxWidth="xs" gap="l">
                    <Column gap="m" horizontal="center">
                        <Icon name="lock" size="xl" onBackground="neutral-weak" />
                        <Heading variant="display-default-m">
                            API Dokümantasyonuna Erişim
                        </Heading>
                        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                            Bu dokümantasyona erişmek için şifre gereklidir.
                        </Text>
                    </Column>
                    
                    <form onSubmit={handlePasswordSubmit}>
                        <Column gap="m">
                            <Column gap="xs">
                                <Text variant="label-default-s" onBackground="neutral-strong">
                                    Şifre
                                </Text>
                                <Flex fillWidth position="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="API dokümantasyon şifresini girin"
                                        required
                                        style={{ 
                                            paddingRight: '40px',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid var(--neutral-alpha-medium)',
                                            backgroundColor: 'var(--neutral-alpha-weak)',
                                            color: 'var(--neutral-on-background-strong)',
                                            width: '100%',
                                            fontSize: '14px'
                                        }}
                                    />
                                    <Button
                                        variant="tertiary"
                                        size="s"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '8px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            zIndex: 1
                                        }}
                                        type="button"
                                    >
                                        <Icon name={showPassword ? "eyeOff" : "eye"} size="s" />
                                    </Button>
                                </Flex>
                            </Column>
                            
                            {error && (
                                <Text variant="body-default-s" onBackground="danger-strong">
                                    {error}
                                </Text>
                            )}
                            
                            <Button 
                                type="submit" 
                                variant="primary" 
                                size="m" 
                                fillWidth
                            >
                                Giriş Yap
                            </Button>
                        </Column>
                    </form>
                    
                    <Column gap="xs" paddingTop="m" style={{ borderTop: '1px solid var(--neutral-alpha-weak)' }}>
                        <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
                            Test için şifre: <code>PaymentAPI2024!</code>
                        </Text>
                    </Column>
                </Column>
            </Flex>
        );
    }

    // Authenticated kullanıcı için logout butonu ekle
    return (
        <Column fillWidth gap="0">
            <Flex fillWidth horizontal="end" paddingBottom="m">
                <Button 
                    variant="tertiary" 
                    size="s" 
                    onClick={handleLogout}
                    prefixIcon="logout"
                >
                    Çıkış Yap
                </Button>
            </Flex>
            {children}
        </Column>
    );
};

export { RouteGuard };