/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as analytics from "../analytics.js";
import type * as categories from "../categories.js";
import type * as http from "../http.js";
import type * as inquiries from "../inquiries.js";
import type * as media from "../media.js";
import type * as singleItems from "../singleItems.js";
import type * as solarPackages from "../solarPackages.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  analytics: typeof analytics;
  categories: typeof categories;
  http: typeof http;
  inquiries: typeof inquiries;
  media: typeof media;
  singleItems: typeof singleItems;
  solarPackages: typeof solarPackages;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
