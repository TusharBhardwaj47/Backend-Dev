app.use((req, res, next) => {
  console.log("Application middleware");
  next();
});


const router = express.Router();

router.use((req, res, next) => {
  console.log("Router middleware");
  next();
});



app.use(express.json());        // parse JSON
app.use(express.urlencoded()); // parse form data
app.use(express.static("public")); // serve static files



function auth(req, res, next) {
  if (req.headers.token) {
    next();
  } else {
    res.send("Unauthorized");
  }
}




  