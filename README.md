<div align="center">

# [`quartz`](https://q.cxntered.dev)

A link shortener built with Next.js & Prisma

</div>

## Development

### Requirements

- [`Node.js`](https://nodejs.org/en/): For running the website (`v18 or higher`)
- [`Yarn`](https://yarnpkg.com/): For installing dependencies (`corepack enable`)
- [`PostgreSQL`](https://www.postgresql.org/): For storing shortened links
- [`Redis`](https://redis.io/): For rate limiting

### Running

```bash
# Install dependencies
$ yarn install

# Rename .env.example to .env and fill in the values
$ mv .env.example .env
$ code .env

# Build the website
$ yarn build

# Start the website
$ yarn start
```

### Other Commands

```bash
# Run the development server
$ yarn dev

# Lint the code
$ yarn lint

# Lint the code and fix errors
$ yarn lint:fix

# Format the code
$ yarn format

# Format the code and fix errors
$ yarn format:fix
```
