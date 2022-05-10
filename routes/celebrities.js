const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");


router.route("/celebrities/create")

.get((req, res)=>{
    res.render("celebrities/new-celebrity")
})
.post((req, res)=>{
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create(req.body)
    .then(()=>res.redirect("/celebrities"))
    .catch(()=>res.render("celebrities/new-celebrity", 
                          {error: "Something went wrong"}))
})

router.get("/celebrities", (req, res)=>{
    Celebrity.find()
    .then((celebrities)=>
          res.render("celebrities/celebrities", {celebrities}))
    .catch(err=>console.log(err))
})

module.exports = router;