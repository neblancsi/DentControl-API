import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { classValidationPipe } from './common/pipes/classValidation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new classValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Patient Manager API')
    .setDescription('Backend API for Dental Patient Manager application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
