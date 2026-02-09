import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { TemplatesModule } from './templates/templates.module';
import { WebsitesModule } from './websites/websites.module';

import { MediaModule } from './media/media.module';

@Module({
  imports: [AuthModule, UsersModule, TemplatesModule, WebsitesModule, MediaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
