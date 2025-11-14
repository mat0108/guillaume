interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // 🔹 Ajoute ici toutes tes variables d'environnement
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.css";
declare module "*.scss";
declare module "*.sass";