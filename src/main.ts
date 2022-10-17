import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const bodyParser =  require('body-parser')
import { AppModule } from './app.module';


async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });


  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('Torque & Drag API')
    .setDescription('The description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  
  await app.listen(8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();