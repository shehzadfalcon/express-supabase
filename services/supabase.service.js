const supabase = require("../config/db");

class SupaBaseService {
  constructor() {
    this.selectProductsFields = "id,name,category,created_at";
    this.selectUserFields = "id,name,email,created_at";

  }
  //create
  async create(table, data) {
    return supabase.from(table).insert(data);
  }
  //get all
  async getAll(table,select) {
    return supabase.from(table).select(select);
  }
  //get by id
  async getById(table, keyId, id,select) {
    return supabase.from(table).select(select).eq(keyId, id).single();
  }
  //update
  async update(table, data, id) {
    return supabase.from(table).update(data).eq("id", id);
  }
  //delete
  async delete(table, id) {
    return supabase.from(table).delete().eq("id", id);
  }
}

module.exports = new SupaBaseService();
