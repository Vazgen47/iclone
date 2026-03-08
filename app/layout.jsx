import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";

const outfit = Outfit({ 
    subsets: ["latin"], 
    weight: ["400", "500", "600"],
    display: 'swap'
});

export const metadata = {
    title: "IClone EVN - Premium Electronics",
    description: "IClone EVN - Premium Electronics Store in Armenia",
};

export default function RootLayout({ children }) {
    return (
        <html lang="hy" suppressHydrationWarning>
            <body className={`${outfit.className} antialiased`}>
                <StoreProvider>
                    <Toaster 
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#0f172a',
                                color: '#ffffff',
                            },
                        }}
                    />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
