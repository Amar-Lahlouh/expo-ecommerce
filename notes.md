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

for frontend clerk

bruh aa inngest baaml account bruh al keys bjeb sigingkey bhtu bl .env

bruh aa imagekit
npm install imagekit
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

bnzl sentrykman get link
https://dub.sh/sentry-c2
it is application motinering krmal iza sar aandi errors aw shi b2le huwi

halaa baad m kon hetta clerk blfrontend bde kun am sayyev al user kman bl monodb database kef?
by using inngest
bruh awl shi aa clerk = >configure=>webhooks=>add endpoint==>inngest
baamlo connect w baaml update lal subscribed events
npw bruh aa innest aala al backend w bchuf docs lal installation
npm install inngest
then create model for user
then writ ethe following code in inngest
import { Inngest } from "inngest";
import { connectDB } from "./db.js";
export const inngest = new Inngest({ id: "ecommerce-app" });

const syncUser = inngest.createFunction(
{ id: "sync-user" },
{ event: "clerk/user.created" }, //hun event contain all data for user created in clerk
async ({ event }) => {
await connectDB();
const { id, email_addresses, first_name, last_name, image_url } =
event.data; //fetch data then create new User
const newUser = {
clerkId: id,
email: email_addresses[0]?.email_address,
name: `${first_name || ""} ${last_name || ""}` || "User",
imageUrl: image_url,
addresses: [],
wishlist: [],
};

    await User.create(newUser);

},
);
export const functions = [syncUser];

and in server.js
import { serve } from "inngest/express";
import { functions, inngest } from "./src/config/inngest.js";
app.use("/api/inngest", serve({ client: inngest, functions }));

halaa bruh aala ingesst baaml new application

now clerk send event to inngest and from inngest to mongodb

now baaml al models the the routes

now krmal l adminm ensa het
const router = Router();
router.post("/products", protectRoute, adminOnly, createProduct);
export default router;
the middles wars

multer middlware 2:33:00

baaml handle input change in frontend.
b2ra al file targe.file[0] thenbntor yaaml upload alaa imagekit
const file = event.target.files[0];
if (!file) return;
console.log("upload ");
const data = await uploadFile(file, file.name);

      setData((prev) => ({
        ...prev,
        image: data?.url,
      }))

hun function al uploadFile h taatene ldata lal image yali nzl bekhod al url
w bsayvu bl image

btrj3e fe file blutils lal imagekit huwi yali byaaml upload

bs byakhod permission mnbackend yali byaati token.expirey
then return for me like ths
{
"url": "https://ik.imagekit.io/amar/products/image.jpg",
"fileId": "abc123",
"name": "image.jpg"
} and this then i read url from method and add it to backend

yane bs backend byaatene tokn w expirey api whd w frontend baandi file whd blutils le brdle al url w bhtu b state wbbaatu lal add
