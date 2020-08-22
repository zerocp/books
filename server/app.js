const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/books", {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});

		console.log("db on");
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};
connectDB();

//allow cross-origin requests
app.use(cors());

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

app.listen(4000, () => {
	console.log("port 4000 on");
});
