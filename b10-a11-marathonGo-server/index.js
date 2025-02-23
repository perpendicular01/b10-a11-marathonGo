const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000;
const app = express()


app.use(cors())
app.use(express.json())

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

        // ----------------------------------------------------------
        // ----------------------marathons---------------------------

        // get all marathons
        app.get('/marathons', async (req, res) => {
            try {
                const marathons = marathonCollection.find()
                const result = await marathons.toArray()
                res.send(result)
                // console.log(marathons)
            }
            catch {
                res.status(500).send({
                    error: "fetch marathons falied"
                })
            }
        })

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
        app.get('/mymarathons', async (req, res) => {
            const { email } = req.query;

            const query = { userEmail: email }

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
                    title : marathon.title,
                    location : marathon.location,
                    runningDistance : marathon.runningDistance,
                    description : marathon.description,
                    marathonImage : marathon.marathonImage,
                    startRegistrationDate : marathon.startRegistrationDate,
                    endRegistrationDate : marathon.endRegistrationDate,
                    marathonStartDate : marathon.marathonStartDate,
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
        app.get('/myApplications', async (req, res) => {
            const { email } = req.query;
            const query = { email: email }

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


            const filter = {_id: new ObjectId(id)}
            const options = { upsert: true }
            const updatedApplication = {
                $set: {
                    // component gula bosabo
                    firstName : application.firstName,
                    lastName : application.lastName,
                    contactNumber : application.contactNumber,
                    additionalInfo : application.additionalInfo,

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


            const filter = {_id: new ObjectId(id)}
            const options = { upsert: true }
            const updatedApplication = {
                $set: {
                    // component gula bosabo
                    distance : marathon.runningDistance,
                    location : marathon.location,
                    marathonTitle : marathon.title,
                    startDate : marathon.marathonStartDate,

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
