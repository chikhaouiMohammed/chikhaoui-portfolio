import '../styles/index.css';



export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Portfolio',
  description: 'Web Designer & Developer',
  icons: {
    icon: [
      { url: '/Favicon.png', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}  <script id="dhws-errorTracker" src="/dhws-error-tracker.js"></script>
  <script id="dhws-elementInspector" src="/dhws-web-inspector.js"></script>
</body>
    </html>
  );
}
