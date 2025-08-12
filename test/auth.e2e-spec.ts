import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Acceder al perfil de usuario', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/login (POST)', () => {

    const userTest = {
      username: process.env.TEST_USER,
      password: process.env.TEST_PWD,
    }

    // autenticar el usuario
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(userTest)
      .expect(200)
      .then(({body}) => {
        console.log(body);

        // validar la respuesta esperada
        expect(body.user).toBeDefined(); // debe traer un usuario
        // el email del usuario autenticado debe ser el de la credencial
        expect(body.user.username).toEqual(userTest.username);

        // se espera que el body traiga access_token
        expect(body.access_token).toBeDefined();

        // conservar el token
        process.env.TOKEN = body.access_token;
      });
  });


  it('/profile (GET) - No Autorizado', () => {
    return request(app.getHttpServer())
      .get('/profile')
      .expect(401);
  });

  it('/profile (GET) - Autorizado', () => {
    return request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200)
      .then(({body}) => {
        console.log(body);

        // evaluar que trae el campo lastname
        // expect(body.lastname).toBeDefined();

        // analizar la respuesta recibida
        expect(body.username).toEqual(process.env.TEST_USER);
        // debe traer name (nombre)
        // expect(body.name).toBeDefined();
      });
  });
});
