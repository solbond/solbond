/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AppImport } from './routes/_app'
import { Route as AppIndexImport } from './routes/_app/index'
import { Route as AppNewImport } from './routes/_app/new'
import { Route as AppAuthImport } from './routes/_app/auth'
import { Route as AppProfileIndexImport } from './routes/_app/profile/index'
import { Route as AppProfileNewImport } from './routes/_app/profile/new'
import { Route as AppProfileAuthImport } from './routes/_app/profile/auth'
import { Route as AppProfileprofileIdProductproductIdImport } from './routes/_app/profile/:profileId/product/:productId'

// Create/Update Routes

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRoute,
} as any)

const AppNewRoute = AppNewImport.update({
  id: '/new',
  path: '/new',
  getParentRoute: () => AppRoute,
} as any)

const AppAuthRoute = AppAuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => AppRoute,
} as any)

const AppProfileIndexRoute = AppProfileIndexImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => AppRoute,
} as any)

const AppProfileNewRoute = AppProfileNewImport.update({
  id: '/profile/new',
  path: '/profile/new',
  getParentRoute: () => AppRoute,
} as any)

const AppProfileAuthRoute = AppProfileAuthImport.update({
  id: '/profile/auth',
  path: '/profile/auth',
  getParentRoute: () => AppRoute,
} as any)

const AppProfileprofileIdProductproductIdRoute =
  AppProfileprofileIdProductproductIdImport.update({
    id: '/profile/:profileId/product/:productId',
    path: '/profile/:profileId/product/:productId',
    getParentRoute: () => AppRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_app/auth': {
      id: '/_app/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AppAuthImport
      parentRoute: typeof AppImport
    }
    '/_app/new': {
      id: '/_app/new'
      path: '/new'
      fullPath: '/new'
      preLoaderRoute: typeof AppNewImport
      parentRoute: typeof AppImport
    }
    '/_app/': {
      id: '/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/profile/auth': {
      id: '/_app/profile/auth'
      path: '/profile/auth'
      fullPath: '/profile/auth'
      preLoaderRoute: typeof AppProfileAuthImport
      parentRoute: typeof AppImport
    }
    '/_app/profile/new': {
      id: '/_app/profile/new'
      path: '/profile/new'
      fullPath: '/profile/new'
      preLoaderRoute: typeof AppProfileNewImport
      parentRoute: typeof AppImport
    }
    '/_app/profile/': {
      id: '/_app/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AppProfileIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/profile/:profileId/product/:productId': {
      id: '/_app/profile/:profileId/product/:productId'
      path: '/profile/:profileId/product/:productId'
      fullPath: '/profile/:profileId/product/:productId'
      preLoaderRoute: typeof AppProfileprofileIdProductproductIdImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppAuthRoute: typeof AppAuthRoute
  AppNewRoute: typeof AppNewRoute
  AppIndexRoute: typeof AppIndexRoute
  AppProfileAuthRoute: typeof AppProfileAuthRoute
  AppProfileNewRoute: typeof AppProfileNewRoute
  AppProfileIndexRoute: typeof AppProfileIndexRoute
  AppProfileprofileIdProductproductIdRoute: typeof AppProfileprofileIdProductproductIdRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppAuthRoute: AppAuthRoute,
  AppNewRoute: AppNewRoute,
  AppIndexRoute: AppIndexRoute,
  AppProfileAuthRoute: AppProfileAuthRoute,
  AppProfileNewRoute: AppProfileNewRoute,
  AppProfileIndexRoute: AppProfileIndexRoute,
  AppProfileprofileIdProductproductIdRoute:
    AppProfileprofileIdProductproductIdRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AppRouteWithChildren
  '/auth': typeof AppAuthRoute
  '/new': typeof AppNewRoute
  '/': typeof AppIndexRoute
  '/profile/auth': typeof AppProfileAuthRoute
  '/profile/new': typeof AppProfileNewRoute
  '/profile': typeof AppProfileIndexRoute
  '/profile/:profileId/product/:productId': typeof AppProfileprofileIdProductproductIdRoute
}

export interface FileRoutesByTo {
  '/auth': typeof AppAuthRoute
  '/new': typeof AppNewRoute
  '/': typeof AppIndexRoute
  '/profile/auth': typeof AppProfileAuthRoute
  '/profile/new': typeof AppProfileNewRoute
  '/profile': typeof AppProfileIndexRoute
  '/profile/:profileId/product/:productId': typeof AppProfileprofileIdProductproductIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteWithChildren
  '/_app/auth': typeof AppAuthRoute
  '/_app/new': typeof AppNewRoute
  '/_app/': typeof AppIndexRoute
  '/_app/profile/auth': typeof AppProfileAuthRoute
  '/_app/profile/new': typeof AppProfileNewRoute
  '/_app/profile/': typeof AppProfileIndexRoute
  '/_app/profile/:profileId/product/:productId': typeof AppProfileprofileIdProductproductIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/auth'
    | '/new'
    | '/'
    | '/profile/auth'
    | '/profile/new'
    | '/profile'
    | '/profile/:profileId/product/:productId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/auth'
    | '/new'
    | '/'
    | '/profile/auth'
    | '/profile/new'
    | '/profile'
    | '/profile/:profileId/product/:productId'
  id:
    | '__root__'
    | '/_app'
    | '/_app/auth'
    | '/_app/new'
    | '/_app/'
    | '/_app/profile/auth'
    | '/_app/profile/new'
    | '/_app/profile/'
    | '/_app/profile/:profileId/product/:productId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/auth",
        "/_app/new",
        "/_app/",
        "/_app/profile/auth",
        "/_app/profile/new",
        "/_app/profile/",
        "/_app/profile/:profileId/product/:productId"
      ]
    },
    "/_app/auth": {
      "filePath": "_app/auth.tsx",
      "parent": "/_app"
    },
    "/_app/new": {
      "filePath": "_app/new.tsx",
      "parent": "/_app"
    },
    "/_app/": {
      "filePath": "_app/index.tsx",
      "parent": "/_app"
    },
    "/_app/profile/auth": {
      "filePath": "_app/profile/auth.tsx",
      "parent": "/_app"
    },
    "/_app/profile/new": {
      "filePath": "_app/profile/new.tsx",
      "parent": "/_app"
    },
    "/_app/profile/": {
      "filePath": "_app/profile/index.tsx",
      "parent": "/_app"
    },
    "/_app/profile/:profileId/product/:productId": {
      "filePath": "_app/profile/:profileId/product/:productId.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
