// clerk.d.ts
export {};
interface Project{
  name:string ,
  project_id:string ,
}
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "employee";
      project: Project[]
    };
  }
}