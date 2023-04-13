# @sensejs/multipart

## 0.11.0-alpha.3

### Patch Changes

- f426f008: Add missing package.json in dist-cjs and dist-mjs folder
- f3e8daf7: Fix README

## 0.11.0-alpha.2

### Minor Changes

- 78821a2a: Introduce experimental multipart support

  This change introduce a new package `@sensejs/multipart` that based on
  `@fastify/busboy` to provide a high level multipart body handling with
  custom storage provider support and back pressure support.

  This package does not depends on the other part of SenseJS, and can be
  used standalong with any other HTTP framwork.