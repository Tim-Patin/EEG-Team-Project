Prerequisites: 

    Node Version Manager 

    Node.js 

How to setup the web application: 

Inside of “package.json” file in the project root, the “scripts.start-server” value should be changed to launch the python server.py using whatever python environment you use. The current one uses my conda environment "CMPSC445_2", so you can replace that with your own environment name, and it should work.  

If you don't use conda, then you will need to figure out how to run the python file with whatever method you use to run python files. 

Additionally, you will need to run "npm install" before running the app so you have the relevant node modules installed. 

 

Running the web application 

Run the command “npm run dev” in a terminal at the root of the project.  

The console should print information that the server is starting. This may take up to 20 seconds to start due to the concurrent start of the Flask server. 

Open http://localhost:3000 with your browser and if the console of the app starts to print a “compiling” message, then it means the server is ready and will be displaying the result to the browser shortly.




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
