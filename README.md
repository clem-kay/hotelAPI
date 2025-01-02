# NestJS Hotel Application API

This README provides instructions for setting up and running your NestJS application, including database creation using Prisma and running a seed file.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16.x or later)
- npm or yarn
- PostgreSQL (or your preferred database)
- Prisma CLI (`npm install -g prisma`)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <project_directory>

2. Install dependencies
   ```bash 
     npm install
   ```
## Installation

1. Create a .env file in the root of the project and add the following:
  ```env
     DATABASE_URL="postgresql://<username>:<password>@<host><port>/<database_name>"
```
  
   Replace <username>, <password>, <host>, <port>, and <database_name> with your  database credentials.

2. Update the prisma/schema.prisma file to match your database setup, if necessary.

## Database Setup

### Generate Prisma client:
  ```bash
  npx prisma generate
  ```
### Migrate the database:
  ```bash
  npx prisma migrate dev --name init
  ```

This will create the database schema based on your prisma/schema.prisma file.
(Optional) View the database in Prisma Studio:
npx prisma studio
### Seed the Database

To populate the database with initial data:

Run the seed script:
npx ts-node prisma/seed.ts
Ensure the seed file (prisma/seed.ts) is properly configured to create necessary entries, such as an admin user.

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
