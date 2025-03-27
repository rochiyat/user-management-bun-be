# user-management-bun-be

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

To build:

```bash
bun build
```

To Migrate:

```bash
bunx prisma migrate dev --name init
bunx prisma generate
```

To Seed:

```bash
bun seed
```

To Generate, When Changes Kolom or Table:

```bash
bunx prisma generate
bunx prisma db push
```

To Deploy Migration to Production:

```bash
bunx prisma migrate deploy
```

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
