// user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  magasinId?: number;
  type: string;
}
