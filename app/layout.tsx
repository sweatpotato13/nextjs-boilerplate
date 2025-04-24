import '@app/styles/globals.css';

import { Navbar } from '@shared/ui';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Next.js FSD Todo App',
    description: 'Todo app built with Feature-Sliced Design',
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
