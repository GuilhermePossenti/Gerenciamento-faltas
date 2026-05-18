/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Para GitHub Pages, defina basePath com o nome do repositório:
  // basePath: '/nome-do-repositorio',
  basePath: '/Gerenciamento-faltas',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
