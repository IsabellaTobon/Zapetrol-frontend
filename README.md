# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Zapetrol Frontend

Una aplicación web moderna para comparar precios de combustibles en España. Utiliza datos del Ministerio de Industria, Comercio y Turismo para mostrar información actualizada de estaciones de servicio.

## 🚀 Características

- **Diseño Moderno**: Interfaz glassmorphism con modo claro/oscuro
- **Accesibilidad**: Cumple con estándares WCAG 2.1
- **Responsive**: Optimizado para dispositivos móviles y desktop
- **Autenticación**: Sistema completo de registro e inicio de sesión
- **Favoritos**: Guarda tus estaciones de servicio favoritas
- **Tiempo Real**: Datos actualizados de precios de combustibles

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Bundler**: Vite
- **Routing**: React Router
- **Styling**: CSS Modules con variables CSS
- **Estado**: Context API
- **HTTP Client**: Axios
- **Linting**: ESLint

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── auth/            # Modales de autenticación
│   ├── common/          # Componentes reutilizables
│   ├── layout/          # Componentes de layout (Navbar)
│   └── pages/           # Páginas principales
├── contexts/            # Contextos de React (Auth, Theme)
├── hooks/               # Hooks personalizados
├── modules/             # Módulos de funcionalidad
│   └── petrol/          # Módulo de combustibles
├── services/            # Servicios API
├── styles/              # Estilos globales
│   ├── base/            # Variables y reset
│   └── components/      # Estilos de componentes
├── types/               # Definiciones de tipos TypeScript
└── utils/               # Utilidades
```

## 🎨 Sistema de Diseño

### Paleta de Colores

- **Modo Claro**: Fondo claro con acentos azules
- **Modo Oscuro**: Fondo oscuro con acentos vibrantes
- **Cumplimiento WCAG**: Todos los colores cumplen con ratios de contraste AA

### Variables CSS

El proyecto utiliza un sistema completo de variables CSS para:

- Colores con variantes RGB para efectos de transparencia
- Espaciado consistente
- Tipografía escalable
- Sombras y radios de borde
- Transiciones suaves

## 🚦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Zapetrol
```

### Instalación

```bash
# Clonar el repositorio
git clone [repository-url]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 📋 Funcionalidades

### 🏠 Página Principal

- Hero section con búsqueda
- Selector de provincia y municipio
- Lista de estaciones de servicio
- Tarjetas de información

### 🔐 Autenticación

- Registro de usuarios
- Inicio de sesión
- Recuperación de contraseña
- Perfiles de usuario

### ⭐ Sistema de Favoritos

- Guardar estaciones favoritas
- Lista personalizada
- Gestión desde dashboard

### 🌙 Tema Dinámico

- Modo claro/oscuro
- Detección automática de preferencias del sistema
- Persistencia en localStorage

## 🔒 Seguridad

- Validación de formularios
- Sanitización de datos
- Autenticación JWT
- Rutas protegidas

## 📱 Responsive Design

- Mobile First
- Breakpoints optimizados
- Touch-friendly interfaces
- Performance optimizada

## 🔄 Estados de Carga

- Skeletons para mejor UX
- Estados de error manejados
- Feedback visual inmediato

## 📊 Performance

- Code splitting automático
- Lazy loading de componentes
- Optimización de imágenes
- Bundle size optimizado

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Coverage
npm run test:coverage
```

## 📈 Monitoreo

- Error tracking
- Performance monitoring
- User analytics

## 🚀 Deployment

### Build

```bash
npm run build
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Tu Nombre** - _Desarrollo inicial_ - [Tu GitHub](https://github.com/tuusuario)

## 🙏 Agradecimientos

- Ministerio de Industria, Comercio y Turismo por los datos de combustibles
- Comunidad de React por las herramientas y bibliotecas
- Contribuidores del proyecto

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
