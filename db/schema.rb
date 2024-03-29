# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_02_143547) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "grouped_planners", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_grouped_planners_on_user_id"
  end

  create_table "plans", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.string "description"
    t.decimal "width"
    t.decimal "height"
    t.decimal "left"
    t.decimal "top"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_plans_on_user_id"
  end

  create_table "user_groups", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "grouped_planner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["grouped_planner_id"], name: "index_user_groups_on_grouped_planner_id"
    t.index ["user_id"], name: "index_user_groups_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "pfp"
    t.string "timezone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users_users", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.integer "friend_id"
    t.boolean "pending", default: true
    t.index ["friend_id", "user_id"], name: "index_users_users_on_friend_id_and_user_id", unique: true
    t.index ["user_id", "friend_id"], name: "index_users_users_on_user_id_and_friend_id", unique: true
    t.index ["user_id"], name: "index_users_users_on_user_id"
  end

  add_foreign_key "grouped_planners", "users"
  add_foreign_key "plans", "users"
  add_foreign_key "user_groups", "grouped_planners"
  add_foreign_key "user_groups", "users"
end
