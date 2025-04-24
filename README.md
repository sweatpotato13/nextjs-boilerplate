# Next.js + Feature-Sliced Design Boilerplate

This project is a boilerplate integrating Next.js App Router with Feature-Sliced Design architecture.

## Feature-Sliced Design (FSD) Structure

This project follows the [Feature-Sliced Design](https://feature-sliced.github.io) architecture.

### Layer Structure (Top → Bottom)

1. **6-app**: App settings and entry point
2. **5-pages**: Routing pages (FSD page components)
3. **4-widgets**: Independent UI blocks
4. **3-features**: User actions
5. **2-entities**: Business entities
6. **1-shared**: Shared utilities

### Dependency Rules

- Lower layers cannot depend on upper layers (e.g., entities cannot depend on features)
- Each slice cannot directly access the internal implementation of other slices, only through public APIs (exports via `index.ts`)

### Next.js Integration

The following structure has been adopted to integrate Next.js App Router with FSD:

```
project/
├── app/                   # Next.js App Router (root level)
│    ├── layout.tsx        # Layout component
│    └── page.tsx          # Main page (imports FSD components)
├── pages/                 # Stub folder (prevents Pages Router use)
│    └── README.md         # Documentation
├── src/                   # FSD structure (with prefixed layers)
│    ├── 1-shared/         # Shared utilities
│    ├── 2-entities/       # Business entities
│    ├── 3-features/       # User actions
│    ├── 4-widgets/        # UI blocks
│    ├── 5-pages/          # FSD page components
│    └── 6-app/            # FSD app settings
```

## Components

- TypeScript
- Next.js App Router
- TailwindCSS
- Feature-Sliced Design

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

<div id="top"></div>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/sweatpotato13/nextjs-boilerplate">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h3 align="center">Nextjs-boilerplate</h3>

  <p align="center">
    boilerplate for nextjs framework
    <br />
    <a href="https://github.com/sweatpotato13/nextjs-boilerplate"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/sweatpotato13/nextjs-boilerplate">View Demo</a>
    ·
    <a href="https://github.com/sweatpotato13/nextjs-boilerplate/issues">Report Bug</a>
    ·
    <a href="https://github.com/sweatpotato13/nextjs-boilerplate/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



### Built With

* [docker](https://www.docker.com/)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sweatpotato13/nextjs-boilerplate.git
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Project Link: [https://github.com/sweatpotato13/nextjs-boilerplate](https://github.com/sweatpotato13/nextjs-boilerplate)

<p align="right">(<a href="#top">back to top</a>)</p>