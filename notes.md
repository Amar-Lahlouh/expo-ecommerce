first npm init -y in backend
2-npm i express dotenv
3-define the folder src and put all folders inside it routes,config,..etc
4-now go to admin and define the react project
5-npx create-expo-app@latest for mobile expo
6-rm -rf .git
7- open new powershell and add git init
8-create .gitignore file w bhet feh node_modules
.env
krmal yaamlon ignore
update the server.js file to
import express from "express";
import path from "path"; //help me to creat file paths like "C:\\Users\\Amar\\project\\admin\\dist"
import { ENV } from "./src/config/env.js";
const app = express();
const \_\_dirname = path.resolve(); //return path of your current project
app.get("/api/health", (req, res) => {
res.json({ message: "Success" });
});

//make our app ready for deployment
if (ENV.NODE_ENV === "production") {
//Any request that is NOT an API route AND NOT a real static file, is sent to index.html.
app.use(express.static(path.join(\_\_dirname, "../admin/dist")));

app.get("/{\*any}", (req, res) => {
res.sendFile(path.join(\_\_dirname, "../admin", "dist", "index.html"));
});
}
app.listen(ENV.PORT, () => {
console.log("Server is running");
});

btrj3e btaaemlf ile paclage.json bl app l asesi w bthti
"scripts": {
"build":"npm install --prefix backend && npm install --prefix admin && npm run build --prefix admin",
"start":"npm run start --prefix backend"
},
zyadi
w lpaclage.json leedn backend kraml eset al nodemon
"scripts": {
"start": "node server.js",
"dev": "nodemon server.js",
"test": "echo \"Error: no test specified\" && exit 1"
},

amarlahlouh5_db_user
mongodb+srv://<db_username>:PnEuasPNrqcZPmPf@cluster0.skrnxxa.mongodb.net/?appName=Cluster0

bhet database linknmn ldriver baadn bruh ala network access
baadn ip access list baadn bzed 0.0.0.0/0

install mongoose and creat db.js file

now baaml sigin 3la clerk
baaml new application brj3 bkbos aala react w baaml copy lal .env lal frontend

now go to clerk express quickstart and do same as docs
1-npm install @clerk/express
2- add the clerkMiddleware and the .emv

bruh aa inngest baaml account bruh al keys bjeb sigingkey bhtu bl .env

bruh aa imagekit
npm install imagekit
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

bnzl sentrykman get link
https://dub.sh/sentry-c2
it is application motinering krmal iza sar aandi errors aw shi b2le huwi
