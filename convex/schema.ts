import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    email: v.string(),
    password: v.string(),
    first_name: v.string(),
    last_name: v.string(),
    role: v.union(v.literal("Admin"), v.literal("HR"), v.literal("user")),
  }),

  Project: defineTable({
    name: v.string(),
    users: v.array(v.id("user")),
  }),

  Employee: defineTable({
    number_id: v.number(),
    first_name: v.string(),
    last_name: v.string(),
    project_id: v.id("Project"),
    type: v.union(v.literal("Quinzainier"), v.literal("Mensuel")),
    status: v.union(v.literal("Actif"), v.literal("Inactif")),
    cin: v.string(),
    date_naissance: v.string(),
    nationalite: v.string(),
    adresse: v.string(),
    ville: v.string(),
    pays: v.string(),
    telephone: v.string(),
    tgcc_role: v.string(),
    tgcc_statu: v.string(),
    rib: v.optional(v.string()) ,
    cnss: v.optional(v.string()) 

  }).index("project_id", ["project_id"]),

  Attendance: defineTable({
    work_date: v.string(),
    employee_id: v.id("Employee"),
    project_id: v.id("Project"),
    check_in: v.string(),
    check_out: v.string(),
    status: v.union(v.literal(false), v.literal(true)),
  })
    .index("project_id", ["project_id"])
    .index("emplyee_id", ["employee_id"]),

  Demande: defineTable({
    user_Id: v.id("user"),
    project_id: v.id("Project"),
    code: v.string(),
    quantite: v.string(),
    datedelivraison: v.string(),
    commentaire: v.string(),
    validation: v.optional(v.union(v.literal(false), v.literal(true))),
    admin_id: v.optional(v.id("user")),
  }).index("project_id", ["project_id"]),

  doc: defineTable({
    user_Id: v.id("user"),
    date: v.optional(v.string()),
    type: v.union(
      v.literal("CIN"),
      v.literal("RIB"),
      v.literal("CNSS"),
      v.literal("CV")
    ),
    employee_id: v.id("Employee"),
    doc_url: v.string(),
    Gestionnaire:v.string() ,
  }).index("employee_id", ["employee_id"]),
});
