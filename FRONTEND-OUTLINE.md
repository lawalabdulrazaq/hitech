## 🧭 FRONTEND OUTLINE FOR ADMIN DASHBOARD (NEXT.JS + CONVEX)

---

### 🌐 1. **Pages & Routes Structure**

* `/admin/dashboard` – Main overview (stats, quick links)
* `/admin/products`

  * `/products/single` – View/Add/Edit Single Items
  * `/products/packages` – View/Add/Edit Solar Packages
* `/admin/media` – Manage uploaded media (images/videos)
* `/admin/inventory` – View stock, reorder alerts
* `/admin/quotes` – Manage customer quotes
* `/admin/orders` – View/manage orders
* `/admin/customers` – CRM dashboard
* `/admin/settings` – Role management, permissions, preferences

---

### 🧩 2. **Component Architecture**

#### ✅ Reusable Components

* `ProductCard`, `PackageCard`, `MediaCard`
* `Table`, `DataGrid`, `FiltersPanel`, `SearchInput`
* `FormModal`, `Drawer`, `Tabs`, `Pagination`
* `ImageUploader`, `VideoUploader`, `SEOFields`
* `RoleSelector`, `PermissionManager`

#### 🛠 Admin Utilities

* `useAdminAuth()` – protects routes
* `useConvexQuery()`, `useConvexMutation()`
* `useForm()` – for validation and state
* `useBulkActions()` – for mass updates
* `useSearchAndFilter()` – dynamic UI filters

---

### 📦 3. **Modules & Screens**

#### 🔹 Single Items (Batteries, Fans)

* Table/List view of products
* Add/Edit Modal or Page
* Upload multiple product images
* Set stock, reorder point, supplier info
* Filters: Category, stock level, price range

#### 🔹 Solar Packages

* Package overview table
* Create/edit package configuration (model, rating, controller, price)
* Preview UI showing supported devices and backup time
* Image uploads + optional package diagram

---

### 🎞 4. **Media Management**

* Upload images/videos with drag-and-drop
* View thumbnails, durations, alt text, and usage count
* Search/filter by file type, usage, date
* Bulk delete or reassign to items/packages

---

### 🧠 5. **Advanced Search & Filters**

* Sidebar filters on all major lists

  * Price range, availability, category
* Saved filter sets (e.g. “Low Stock Items”)
* Full-text product search (Elasticsearch optional integration)

---

### 📊 6. **Inventory Dashboard**

* Stock level indicators (low, out-of-stock, reorder)
* Table of items with current stock, reserved, max stock
* Editable fields: warehouse location, supplier info
* Export CSV or print inventory summary

---

### 🧾 7. **Quote Management UI**

* Quote table with status tags
* Quote builder form (add items from inventory)
* Auto-calculate subtotals, taxes, totals
* Set validity, payment & delivery terms
* PDF/Print-friendly quote generation

---

### 👥 8. **Customer CRM**

* List of customers with contact and classification
* Detailed view: profile, addresses, communication preferences
* Add/edit notes and tags
* Filter: VIPs, segments, active/inactive

---

### 📦 9. **Order Management**

* Orders table: order number, customer, status, amount
* Order detail view with items, shipping, fulfillment
* Change order status, add tracking, mark as paid
* Fulfillment & installation status management

---

### 📈 10. **Analytics & Dashboard**

* Daily/weekly/monthly metrics charts
* Top viewed items/packages
* Recent quotes, new customers
* Low stock warnings, orders pending fulfillment

---

### 🛡️ 11. **Security & Role Management**

* Admin settings page
* Role-based access control:

  * Permissions table
  * Assign roles to users
* Audit log viewer

---

### 🧪 12. **DevOps & Support Features**

* Error logging UI (optional)
* Admin notes & changelog area
* Feature toggle panel (for future releases)
* Backup/download data (CSV export)
