# Gunakan Bun sebagai base image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Salin semua file proyek ke dalam container
COPY . .

# Install dependencies dan generate Prisma Client
RUN bun install --frozen-lockfile
RUN bun prisma generate

# Expose port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["bun", "run", "src/index.ts"]
