# Stub Next.js Pages Folder

## Purpose of this Folder

This folder is a stub folder designed to prevent the use of Next.js Pages Router functionality. In Next.js, the `pages` directory at the project root is automatically used for routing. By creating this folder and intentionally keeping it empty, we prevent the use of the Pages Router.

## Why is this Folder Necessary?

1. **App Router Only Usage**: This project has decided to use only Next.js App Router. While Pages Router and App Router can be used together, for clarity and consistency, this project uses only the App Router.

2. **Integration with Feature-Sliced Design**: This project follows Feature-Sliced Design architecture, which may conflict with Next.js's default routing structure. This stub folder helps maintain the FSD structure while integrating with Next.js.

3. **Clear Intent Expression**: This README file explains to other developers why this empty folder exists and guides them not to accidentally use the Pages Router.

## Important Notes

- Do not add actual page components to this folder. All pages should be defined in the App Router via the `app/` directory.
- FSD page components are defined in the `src/5-pages` directory according to the FSD structure. 