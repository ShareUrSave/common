#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { name: packageName } = require('../package.json');

const commonDir = path.resolve(__dirname, '..');
const schemaPath = path.join(commonDir, 'prisma', 'schema.prisma');

if (!fs.existsSync(schemaPath)) {
  console.error('❌ Schema Prisma not found at:', schemaPath);
  process.exit(1);
}

const parentDir = process.cwd();

const commands = {
  generate: () => {
    console.log('🔄 Generating Prisma Client...');
    try {
      execSync(`npx prisma generate --schema="${schemaPath}"`, {
        stdio: 'inherit',
        cwd: parentDir,
      });
      console.log('✅ Prisma Client generated successfully!');
    } catch (error) {
      console.error('❌ Error generating Prisma Client:', error.message);
      process.exit(1);
    }
  },

  migrate: () => {
    console.log('🔄 Running Prisma migrations...');
    try {
      execSync(`npx prisma migrate dev --schema="${schemaPath}"`, {
        stdio: 'inherit',
        cwd: parentDir,
      });
      console.log('✅ Migrations completed successfully!');
    } catch (error) {
      console.error('❌ Error running migrations:', error.message);
      process.exit(1);
    }
  },

  studio: () => {
    console.log('🔄 Starting Prisma Studio...');
    try {
      execSync(`npx prisma studio --schema="${schemaPath}"`, {
        stdio: 'inherit',
        cwd: parentDir,
      });
    } catch (error) {
      console.error('❌ Error starting Prisma Studio:', error.message);
      process.exit(1);
    }
  },

  reset: () => {
    console.log('🔄 Resetting Prisma database...');
    try {
      execSync(`npx prisma migrate reset --schema="${schemaPath}" --force`, {
        stdio: 'inherit',
        cwd: parentDir,
      });
      console.log('✅ Database reset successfully!');
    } catch (error) {
      console.error('❌ Error resetting database:', error.message);
      process.exit(1);
    }
  },

  deploy: () => {
    console.log('🔄 Deploying Prisma migrations...');
    try {
      execSync(`npx prisma migrate deploy --schema="${schemaPath}"`, {
        stdio: 'inherit',
        cwd: parentDir,
      });
      console.log('✅ Migrations deployed successfully!');
    } catch (error) {
      console.error('❌ Error deploying migrations:', error.message);
      process.exit(1);
    }
  },

  help: () => {
    console.log(`
📦 ${packageName} CLI

Available commands:
  ${packageName} generate    Generate Prisma Client
  ${packageName} migrate     Run database migrations
  ${packageName} studio      Open Prisma Studio
  ${packageName} reset       Reset database
  ${packageName} deploy      Deploy migrations (production)
  ${packageName} help        Show this help

Usage:
  npx ${packageName} <command>
  npm run ${packageName}:<command>
`);
  },
};

const command = process.argv[2];

if (!command || !commands[command]) {
  console.error('❌ Unknown command:', command || 'none');
  commands.help();
  process.exit(1);
}

commands[command]();
