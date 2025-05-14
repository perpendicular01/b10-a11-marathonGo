const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 5000;
const app = express()


app.use(cors({
    origin: ['http://localhost:5173',
        'https://marathongp-pdpepe.web.app',
        'https://marathongp-pdpepe.firebaseapp.com'
    ],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).send({ message: 'unauthorized access' })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'unauthorized access' })
        }

        req.user = decoded
        next()
    })
}


const userName = process.env.DB_USER
const password = process.env.DB_PASS

// console.log(userName, password)


const uri = `mongodb+srv://${userName}:${password}@cluster0.oi6ry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();

        const database = client.db("MarathonGo")
        const marathonCollection = database.collection("marathons")
        const applyCollection = database.collection("applications")

        // --------------------------jwt--------------------------------
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                })
                .send({ success: true })
        })

        app.post('/logout', async (req, res) => {
            res.
                clearCookie('token', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                })
                .send({ success: true })
        })
        // ----------------------marathons---------------------------

        // get all marathons
        app.get('/marathons', verifyToken, async (req, res) => {
            const { email } = req.query;

            const query = { userEmail: email }

            if (req.user.email !== req.query.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            
            try {
                const sortOrder = req.query.sort === 'asc' ? -1 : 1;


                const marathons = await marathonCollection
                    .find()
                    .sort({ createdAt: sortOrder })
                    .toArray();

                res.send(marathons);
                // console.log(marathons)
            }
            catch {
                res.status(500).send({
                    error: "fetch marathons falied"
                })
            }
        })

        // highlightes
        app.get('/marathons/highlighted', async (req, res) => {
            try {
                const marathons = await marathonCollection
                    .find()
                    .limit(6)
                    .toArray();

                res.send(marathons);
            } catch {
                res.status(500).send({
                    error: "Fetching highlighted marathons failed"
                });
            }
        });


        // get marathon by id
        app.get('/marathons/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id)
            const query = { _id: new ObjectId(id) }



            try {
                const result = await marathonCollection.findOne(query)
                res.send(result)
            }
            catch {
                res.status(500).send({
                    error: "fetch marathons falied"
                })

            }
        })

        // get marathon by EMAIL
        app.get('/mymarathons', verifyToken, async (req, res) => {
            const { email } = req.query;

            const query = { userEmail: email }

            if (req.user.email !== req.query.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            try {
                const marathons = marathonCollection.find(query)
                const result = await marathons.toArray()
                res.send(result)
            }
            catch {
                res.status(500).send({
                    error: "fetch marathons falied"
                })

            }
        })

        // INSERT A marathon
        app.post("/marathons", async (req, res) => {
            const marathon = req.body
            // console.log("new marathon : ", marathon)

            try {
                const result = await marathonCollection.insertOne(marathon)
                res.send(result)
            }
            catch {
                res.status(500).send({
                    error: "adding marathon falied"
                })
            }
        })


        // UPDATE A marathon
        app.put("/marathons/:id", async (req, res) => {
            const id = req.params.id;
            const marathon = req.body


            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updatedMarathon = {
                $set: {
                    title: marathon.title,
                    location: marathon.location,
                    runningDistance: marathon.runningDistance,
                    description: marathon.description,
                    marathonImage: marathon.marathonImage,
                    startRegistrationDate: marathon.startRegistrationDate,
                    endRegistrationDate: marathon.endRegistrationDate,
                    marathonStartDate: marathon.marathonStartDate,
                    // component gula bosabo

                }
            }
            // console.log(id, updatedmarathon)

            try {
                const result = await marathonCollection.updateOne(filter, updatedMarathon, options)
                res.send(result)
            }
            catch {
                res.status(500).send({
                    error: "update marathon falied"
                })
            }
        })

        // update patch version
        app.patch("/marathons/:id", async (req, res) => {
            const id = req.params.id;

            const filter = { _id: new ObjectId(id) };
            const updateOperation = {
                $inc: { totalRegistrationCount: 1 }, // Increment count by 1
            };

            try {
                const result = await marathonCollection.updateOne(filter, updateOperation);

                if (result.matchedCount === 0) {
                    return res.status(404).send({ error: "Marathon not found" });
                }

                res.send({ message: "Registration count updated successfully", result });
            } catch (error) {
                console.error("Error updating marathon:", error);
                res.status(500).send({ error: "Failed to update marathon" });
            }
        });

        // decrement 
        app.patch("/decrementApplicant/:id", async (req, res) => {
            const id = req.params.id;

            const filter = { _id: new ObjectId(id) };
            const updateOperation = {
                $inc: { totalRegistrationCount: -1 }, // Increment count by 1
            };

            try {
                const result = await marathonCollection.updateOne(filter, updateOperation);

                if (result.matchedCount === 0) {
                    return res.status(404).send({ error: "Marathon not found" });
                }

                res.send({ message: "Registration count updated successfully", result });
            } catch (error) {
                console.error("Error updating marathon:", error);
                res.status(500).send({ error: "Failed to update marathon" });
            }
        });


        // DELETE A marathon
        app.delete('/deleteMarathons/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id)

            const query = { _id: new ObjectId(id) }

            try {
                const result = await marathonCollection.deleteOne(query)
                res.send(result)
            }
            catch {
                res.status(500).send({
                    error: "delete marathon falied"
                })
            }
        })

        // -----------------------------------------------------------------------------

        // ------------------------.............applications.............................
        // INSERT A Application
        app.post("/usersApplications", async (req, res) => {
            const application = req.body
            // console.log("new application : ", application)

            try {
                const result = await applyCollection.insertOne(application)
                res.send(result)
            }
            catch {
                res.status(500).send({
                    error: "adding applications falied"
                })
            }
        })

        // get application by EMAIL
        app.get('/myApplications', verifyToken, async (req, res) => {
            const { email } = req.query;
            const query = { email: email }

            const search = req.query?.search
            // console.log(req.query)

            if (search) {
                query.marathonTitle = { $regex: search, $options: "i" }
            }

            // console.log(req.cookies?.token)


            if (req.user.email !== req.query.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            try {
                const applications = applyCollection.find(query)
                const result = await applications.toArray()
                res.send(result)
            }
            catch {
                res.status(500).send({
                    error: "fetch applications falied"
                })

            }
        })

        app.get("/checkRegistration", async (req, res) => {
            const { email, marathonId } = req.query;

            try {

                const query = { email: email, marathonId };
                const existingRegistration = await applyCollection.findOne(query);
                res.send({ isRegistered: !!existingRegistration });
            } catch (error) {
                console.error("Error checking registration:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });


        // delete application by id
        app.delete('/deleteApplication/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id)

            const query = { marathonId: id }

            try {
                const result = await applyCollection.deleteMany(query)
                res.send(result)
            }
            catch {
                res.status(500).send({
                    error: "delete marathon falied"
                })
            }
        })

        //   update application
        app.put("/updateUsersApplication/:id", async (req, res) => {
            const id = req.params.id;
            const application = req.body


            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updatedApplication = {
                $set: {
                    // component gula bosabo
                    firstName: application.firstName,
                    lastName: application.lastName,
                    contactNumber: application.contactNumber,
                    additionalInfo: application.additionalInfo,

                }
            }
            // console.log(id, updatedmarathon)

            try {
                const result = await applyCollection.updateOne(filter, updatedApplication, options)
                res.send(result)
            }
            catch {
                res.status(500).send({
                    error: "update Application falied"
                })
            }
        })


        app.put("/updateUsersMarathon/:id", async (req, res) => {
            const id = req.params.id;
            const marathon = req.body


            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updatedApplication = {
                $set: {
                    // component gula bosabo
                    distance: marathon.runningDistance,
                    location: marathon.location,
                    marathonTitle: marathon.title,
                    startDate: marathon.marathonStartDate,

                }
            }
            // console.log(id, updatedmarathon)

            try {
                const result = await applyCollection.updateOne(filter, updatedApplication, options)
                res.send(result)
            }
            catch {
                res.status(500).send({
                    error: "update Application falied"
                })
            }
        })


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})
