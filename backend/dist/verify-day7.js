"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv = require("dotenv");
dotenv.config();
const prisma = new client_1.PrismaClient();
async function verify() {
    console.log('--- Environment Verification ---');
    const envVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
    const missing = envVars.filter(key => !process.env[key]);
    if (missing.length > 0) {
        console.log(`❌ Missing Cloudinary Keys: ${missing.join(', ')}`);
    }
    else {
        console.log('✅ Cloudinary Keys Present');
    }
    console.log('\n--- Database Verification ---');
    const recentFiles = await prisma.mediaFile.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, userId: true, url: true, type: true, createdAt: true }
    });
    console.log(`Found ${recentFiles.length} recent media files:`);
    console.table(recentFiles);
    const userUploads = await prisma.mediaFile.groupBy({
        by: ['userId'],
        _count: { id: true },
    });
    console.log('\nUploads per user:');
    console.table(userUploads.map(u => ({ userId: u.userId, count: u._count.id })));
    const typeDist = await prisma.mediaFile.groupBy({
        by: ['type'],
        _count: { id: true },
    });
    console.log('\nFile type distribution:');
    console.table(typeDist.map(t => ({ type: t.type, count: t._count.id })));
    await prisma.$disconnect();
}
verify().catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=verify-day7.js.map