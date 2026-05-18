import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'SisFreq — Sistema de Frequência Escolar',
  description: 'Plataforma de monitoramento de frequência do Instituto Federal Catarinense - Campus Videira',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
