import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs'; // Importing fs from 'fs' directly, no need for node:fs
import { Logger } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Groww Business')
    .setDescription('Empowering entrepreneurs with customizable e-commerce.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  writeFileSync('./swagger-spec.json', JSON.stringify(document));
  await app.listen(process.env.APP_PORT);
  logger.log(
    `Application is running on: ${await app.getUrl()}, process id: ${process.pid
    }`,
  );
}
bootstrap();
