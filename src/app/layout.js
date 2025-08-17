import "./globals.css";

export const metadata = {
  title: "Awesome Simulations",
  description: "A collection of awesome simulations, animations, and experiments. Made by rajivnaync@",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
