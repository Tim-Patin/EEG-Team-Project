### Prerequisites: ###

* Node Version Manager 

* Node.js 

### How to setup the web application: ###

Inside of “package.json” file in the project root, the “scripts.start-server” value should be changed to launch the python server.py using whatever python environment you use. The current one uses my conda environment "CMPSC445_2", so you can replace that with your own environment name, and it should work.  

If you don't use conda, then you will need to figure out how to run the python file with whatever method you use to run python files. 

Additionally, you will need to run "npm install" before running the app so you have the relevant node modules installed. 

 

### Running the web application ###

Run the command “npm run dev” in a terminal at the root of the project.  

The console should print information that the server is starting. This may take up to 20 seconds to start due to the concurrent start of the Flask server. 

Open http://localhost:3000 with your browser and if the console of the app starts to print a “compiling” message, then it means the server is ready and will be displaying the result to the browser shortly.




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
