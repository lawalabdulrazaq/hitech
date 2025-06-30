/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules, FilterApi, FunctionReference } from "convex/server"
import type * as auth from "../auth.js"
import type * as customers from "../customers.js"
import type * as inventory from "../inventory.js"
import type * as orders from "../orders.js"
import type * as products from "../products.js"
import type * as quotes from "../quotes.js"

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth
  customers: typeof customers
  inventory: typeof inventory
  orders: typeof orders
  products: typeof products
  quotes: typeof quotes
}>
export declare const api: FilterApi<typeof fullApi, FunctionReference<any, "public">>
export declare const internal: FilterApi<typeof fullApi, FunctionReference<any, "internal">>
