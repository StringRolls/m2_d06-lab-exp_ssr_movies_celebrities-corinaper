const router = require("express").Router();
const Movies = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");



router.route("/movies/create")

.get((req, res)=>{
    Celebrity.find()
    .then((celebrities)=>{
        res.render("movies/new-movie",{celebrities})})
    
})
.post((req, res)=>{
    const {title, genre, plot, cast} = req.body
    Movies.create(req.body)
    .then(()=>res.redirect("/movies"))
    .catch(()=>res.render("movies/new-movie", 
                          {error: "Something went wrong"}))
})


router.post("/movies/:id/delete", (req, res)=>{
    const { id } = req.params
    Movies.findByIdAndDelete(id)
    .then(()=>res.redirect("/movies"))
    .catch(err=>console.log(err))
})


router.route("/movies/:id/edit")
.get((req, res)=>{
    
    const { id } = req.params
    const movie = Movies.findById(id)
    const celebrities = Celebrity.find()
    
    Promise.all([movie,celebrities])
    .then((values)=>{ 
        console.log(values)
        res.render("movies/edit-movie", 
                     {movie: values[0], 
                        celebrities:values[1]
                    })
    
})
     .catch(err=>console.log(err))
    })

.post((req, res)=>{
    const { id } = req.params
    const {title, genre, plot, cast} = req.body
    Movies.findByIdAndUpdate(id, {title, genre, plot, cast})
    .then(()=>res.redirect("/movies"))
})

router.get("/movies/:id", (req, res)=>{
   const { id } = req.params
   
   Movies.findById(id).populate("cast")
   
   .then((movie)=>{
       console.log(movie)
    res.render("movies/movie-details", {movie})})
    .catch(err=>console.log(err))
})

router.get("/movies", (req, res)=>{
    Movies.find()
    .then((movies)=>
          res.render("movies/movies", {movies}))
    .catch(err=>console.log(err))
})
module.exports = router;